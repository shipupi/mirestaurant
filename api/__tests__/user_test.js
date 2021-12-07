const {server} = require('../server.js');
const supertest = require('supertest');
const request = supertest(server);
const {prisma} = require('../prisma/client');
const {hash_password} = require('../middleware/auth.middleware')

let password = 'Aniabet1,'
let admin_token = null;
let user_token = null;
let admin_user;
let test_user;


beforeAll(async () => {
    admin_user = await prisma.users.create({
        data: {
            'email': 'test_admin@restauranto.com',
            'name': 'Test Admin',
            'password': hash_password(password),
            'is_admin': true
        }
    })
    test_user = await prisma.users.create({
        data: {
            'email': 'test_user@restauranto.com',
            'name': 'Test User',
            'password': hash_password(password),
            'is_admin': false
        }
    })

    let res = await request
        .post('/api/auth/login')
        .send({'email': admin_user.email, 'password': password})
    
    admin_token = `Bearer ${res.body.access_token}`;

    res = await request
        .post('/api/auth/login')
        .send({'email': test_user.email, 'password': password})
    user_token = `Bearer ${res.body.access_token}`;
});

describe('User Endpoints', () => { 
    describe('GET /users', () => {
        it('requires login', async () => {
            let res = await request.get('/api/users');
            expect(res.status).toEqual(401);
        });
        it('requires admin privileges', async () => {
            let res = await request.get('/api/users')
            .set('Authorization', user_token)
            expect(res.status).toEqual(403);
        });

        it('returns all users', async () => {
            let res = await request.get('/api/users')
            .set('Authorization', admin_token)
            expect(res.status).toEqual(200)
            expect(Array.isArray(res.body)).toBeTruthy()
            expect(res.body.length).toEqual(2)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('email')
            expect(res.body[0]).toHaveProperty('user_id')
            expect(res.body[0].name).toEqual(admin_user.name)
            expect(res.body[0].email).toEqual(admin_user.email)
            expect(res.body[0].user_id).toEqual(admin_user.user_id)
        });
    });

    describe('GET /users/:id', () => {
        it('requires login', async () => {
            let res = await request.get('/api/users/' + admin_user.user_id);
            expect(res.status).toEqual(401);
        });
        it('requires admin privileges', async () => {
            let res = await request.get('/api/users/' + admin_user.user_id)
            .set('Authorization', user_token)
            expect(res.status).toEqual(403);
        });

        it('get an unexisting user', async () => {
            let res = await request.get('/api/users/' + 200)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(404);
        });

        it('returns user with specific id', async () => {
            let res = await request.get('/api/users/' + admin_user.user_id)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(200)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('user_id')
            expect(res.body).toHaveProperty('is_admin')
            expect(res.body).not.toHaveProperty('password')
            expect(res.body.name).toEqual(admin_user.name)
            expect(res.body.email).toEqual(admin_user.email)
            expect(res.body.user_id).toEqual(admin_user.user_id)
            expect(res.body.is_admin).toEqual(admin_user.is_admin) 
        });
    });
    
    describe('DELETE /users/:id', () => {
        let dummy_user;
        beforeAll(async () => {
            dummy_user = await prisma.users.create({
                data: {
                    'email': 'test_dummy@restauranto.com',
                    'name': 'Test Dummy',
                    'password': hash_password(password),
                    'is_admin': true
                }
            })
        }) 
        it('requires login', async () => {
            let res = await request.delete('/api/users/' + admin_user.user_id);
            expect(res.status).toEqual(401);
        });
        it('requires admin privileges', async () => {
            let res = await request.delete('/api/users/' + admin_user.user_id)
            .set('Authorization', user_token)
            expect(res.status).toEqual(403);
        });

        it('delete an unexisting user', async () => {
            let res = await request.delete('/api/users/' + 200)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(404);
        });

        it('deletes a user with specific id', async () => {
            // Sanity check
            let maybe_user = await prisma.users.findUnique({
                where: {
                    user_id: dummy_user.user_id
                }
            })
            expect(maybe_user).not.toBeNull()
            maybe_user = null;

            let res = await request.delete('/api/users/' + dummy_user.user_id)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(204)

            maybe_user = await prisma.users.findUnique({
                where: {
                    user_id: dummy_user.user_id
                }
            })
            expect(maybe_user).toBeNull()
            
        });
        afterAll(async () => {
            // Cleanup
            try {
                
                await prisma.users.delete({
                    where: {
                        user_id: dummy_user.user_id
                    }
                })
            } catch(e) {
                // User was deleted in test
            }
        })
    });

    describe('POST /users/', () => {
        it("Create user with existing email", async () => {
            let res = await request
            .post('/api/users')
            .send({name: 'foo', 'email': admin_user.email, 'password': password})
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
            expect(res.body.errors[0].param).toEqual('email')
            expect(res.body.errors[0].msg).toEqual('Email already in use')
        })
    });

    describe('POST /users/', () => {
        it("name and password too short", async () => {
            let res = await request
            .post('/api/users')
            .send({name: 'a', 'email': "new_email@restauranto.com", 'password': 'a'})
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(2)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
        
        })
    });
    describe('POST /users/', () => {
        it("name too short", async () => {
            let res = await request
            .post('/api/users')
            .send({name: 'a', 'email': "new_email@restauranto.com", 'password': password})
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
        
        })
    });

    describe('POST /users/', () => {
        it("password without numbers", async () => {
            let res = await request
            .post('/api/users')
            .send({name: 'foo', 'email': "new_email@restauranto.com", 'password': 'Aniabet,'})
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
        
        })
    });

    describe('POST /users/', () => {
        it("password without symbols", async () => {
            let res = await request
            .post('/api/users')
            .send({name: 'foo', 'email': "new_email@restauranto.com", 'password': 'Aniabet1'})
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
        
        })
    });

    describe('POST /users/', () => {
        it("Create user", async () => {
            let res = await request
            .post('/api/users')
            .send({name: 'foo', 'email': "new_email@restauranto.com", 'password': password})
            expect(res.status).toEqual(201)
            expect(res.body).toHaveProperty('access_token')
            expect(res.body).toHaveProperty('user')

            expect(res.body.user).toHaveProperty('user_id')
            expect(res.body.user).toHaveProperty('name')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user).toHaveProperty('is_admin')
            expect(res.body.user.name).toEqual('foo')
            expect(res.body.user.email).toEqual("new_email@restauranto.com")
            expect(res.body.user.is_admin).toEqual(false)
            
            // Cleanup
            await prisma.users.delete({
                where: {
                    user_id: res.body.user.user_id
                }
            })
        
        })
    });



    describe('PATCH /users/:id', () => {
        let dummy_user;
        beforeAll(async () => {
            dummy_user = await prisma.users.create({
                data: {
                    'email': 'test_dummy@restauranto.com',
                    'name': 'Test Dummy',
                    'password': hash_password(password),
                    'is_admin': true
                }
            })
        }) 
        it('requires login', async () => {
            let res = await request.patch('/api/users/' + admin_user.user_id);
            expect(res.status).toEqual(401);
        });
        it('requires admin privileges', async () => {
            let res = await request.patch('/api/users/' + admin_user.user_id)
            .set('Authorization', user_token)
            expect(res.status).toEqual(403);
        });

        it('patch an unexisting user', async () => {
            let res = await request.patch('/api/users/' + 200)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(404);
        });

        it('change a user name', async () => {
            let res = await request.patch('/api/users/' + dummy_user.user_id)
            .set('Authorization', admin_token)
            .send({
                name: "newname"
            })

            let user = await prisma.users.findUnique({
                where: {
                    user_id: dummy_user.user_id
                }
            })
            expect(user.name).toEqual('newname')
        });

        it('change a user password', async () => {
            let newPass = "Aniabet123,"
            let res = await request.patch('/api/users/' + dummy_user.user_id)
            .set('Authorization', admin_token)
            .send({
                password: newPass
            })

            let user = await prisma.users.findUnique({
                where: {
                    user_id: dummy_user.user_id
                }
            })
            let [salt, existing_hash] = user.password.split('$');
            expect(user.password).toEqual(hash_password(newPass, salt))
        });

        it('change a user email', async () => {
            let res = await request.patch('/api/users/' + dummy_user.user_id)
            .set('Authorization', admin_token)
            .send({
                email: "newemail@newname.com"
            })

            let user = await prisma.users.findUnique({
                where: {
                    user_id: dummy_user.user_id
                }
            })
            expect(user.email).toEqual('newemail@newname.com')
        });

        it('change a user email to an existing email', async () => {
            let res = await request.patch('/api/users/' + dummy_user.user_id)
            .set('Authorization', admin_token)
            .send({
                email: admin_user.email
            })

            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
            expect(res.body.errors[0].param).toEqual('email')
            expect(res.body.errors[0].msg).toEqual('Email already in use')
        });

        afterAll(async () => {
            // Cleanup
            try {
                
                await prisma.users.delete({
                    where: {
                        user_id: dummy_user.user_id
                    }
                })
            } catch(e) {
                // User was deleted in test
            }
        })
    });
});

afterAll(async () => {
    await prisma.users.deleteMany({});
})  