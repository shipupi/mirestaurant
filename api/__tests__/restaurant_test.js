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
let red_lobster;


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

    red_lobster = await prisma.restaurants.create({
        data: {
            name: 'Red Lobster',
            slug: 'red-lobster',
            reviews: {
                create: [
                    {
                        rating: 3,
                        comment: "Good",
                        user_id: admin_user.user_id,
                    },
                    {
                        rating: 2,
                        comment: "Bad",
                        user_id: admin_user.user_id,
                    }
                ]
            }
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

describe('Restaurant Endpoints', () => { 
    describe('GET /restaurants', () => {

        it('returns all restaurants', async () => {
            let res = await request.get('/api/restaurants')
            .set('Authorization', admin_token)
            expect(Array.isArray(res.body)).toBeTruthy()
            expect(res.body.length).toEqual(1)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('slug')
            expect(res.body[0]).toHaveProperty('restaurant_id')
            expect(res.body[0].name).toEqual(red_lobster.name)
            expect(res.body[0].slug).toEqual(red_lobster.slug)
            expect(res.body[0].restaurant_id).toEqual(red_lobster.restaurant_id)
        });
    });

    describe('GET /restaurants/:id', () => {
        it('get an unexisting restaurant', async () => {
            let res = await request.get('/api/restaurants/' + 200)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(404);
        });

        it('get restaurant without auth', async () => {
            let res = await request.get('/api/restaurants/' + red_lobster.restaurant_id)
            expect(res.status).toEqual(200)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('slug')
            expect(res.body).toHaveProperty('restaurant_id')
            expect(res.body.name).toEqual(red_lobster.name)
            expect(res.body.slug).toEqual(red_lobster.slug)
            expect(res.body.restaurant_id).toEqual(red_lobster.restaurant_id)
            expect(res.body).toHaveProperty('reviews')

        });

        it('get restaurant with admin user auth', async () => {
            let res = await request.get('/api/restaurants/' + red_lobster.restaurant_id)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(200)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('slug')
            expect(res.body).toHaveProperty('restaurant_id')
            expect(res.body.name).toEqual(red_lobster.name)
            expect(res.body.slug).toEqual(red_lobster.slug)
            expect(res.body.restaurant_id).toEqual(red_lobster.restaurant_id)
            expect(res.body).toHaveProperty('reviews')

            expect(res.body.reviews).toHaveProperty('latest')
            expect(res.body.reviews).toHaveProperty('highest')
            expect(res.body.reviews).toHaveProperty('lowest')
            expect(res.body.reviews.highest.rating).toEqual(3)
            expect(res.body.reviews.highest.comment).toEqual("Good")
            expect(res.body.reviews.lowest.rating).toEqual(2)
            expect(res.body.reviews.lowest.comment).toEqual("Bad")
            expect(res.body).toHaveProperty('all_reviews')
            expect(res.body.all_reviews.length).toEqual(2)
        });

        it('get restaurant with regular user auth', async () => {
            let res = await request.get('/api/restaurants/' + red_lobster.restaurant_id)
            .set('Authorization', user_token)
            expect(res.status).toEqual(200)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('slug')
            expect(res.body).toHaveProperty('restaurant_id')
            expect(res.body.name).toEqual(red_lobster.name)
            expect(res.body.slug).toEqual(red_lobster.slug)
            expect(res.body.restaurant_id).toEqual(red_lobster.restaurant_id)
            expect(res.body).toHaveProperty('reviews')

            expect(res.body.reviews).toHaveProperty('latest')
            expect(res.body.reviews).toHaveProperty('highest')
            expect(res.body.reviews).toHaveProperty('lowest')
            expect(res.body).not.toHaveProperty('all_reviews')
            expect(res.body.reviews.highest.rating).toEqual(3)
            expect(res.body.reviews.highest.comment).toEqual("Good")
            expect(res.body.reviews.lowest.rating).toEqual(2)
            expect(res.body.reviews.lowest.comment).toEqual("Bad")
        });
    });
    
    describe('DELETE /restaurants/:id', () => {
        let dummy_restaurant;
        beforeAll(async () => {
            dummy_restaurant = await prisma.restaurants.create({
                data: {
                    'name': 'Black Lobster',
                    'slug': 'black-lobster'
                }
            })
        }) 
        it('requires login', async () => {
            let res = await request.delete('/api/restaurants/' + dummy_restaurant.restaurant_id);
            expect(res.status).toEqual(401);
        });
        it('requires admin privileges', async () => {
            let res = await request.delete('/api/restaurants/' + dummy_restaurant.restaurant_id)
            .set('Authorization', user_token)
            expect(res.status).toEqual(403);
        });

        it('delete an unexisting restaurant', async () => {
            let res = await request.delete('/api/restaurants/' + 200)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(404);
        });

        it('deletes a restaurant with specific id', async () => {
            // Sanity check
            let maybe_restaurant = await prisma.restaurants.findUnique({
                where: {
                    restaurant_id: dummy_restaurant.restaurant_id
                }
            })
            expect(maybe_restaurant).not.toBeNull()
            maybe_restaurant = null;

            let res = await request.delete('/api/restaurants/' + dummy_restaurant.restaurant_id)
            .set('Authorization', admin_token)
            expect(res.status).toEqual(204)

            maybe_restaurant = await prisma.restaurants.findUnique({
                where: {
                    restaurant_id: dummy_restaurant.restaurant_id
                }
            })
            expect(maybe_restaurant).toBeNull()
            
        });
        afterAll(async () => {
            // Cleanup
            try {
                
                await prisma.restaurants.delete({
                    where: {
                        restaurant_id: dummy_restaurant.restaurant_id
                    }
                })
            } catch(e) {
                // Restaurant was deleted in test
            }
        })
    });

    describe('POST /restaurants/', () => {
        it('requires login', async () => {
            let res = await request.post('/api/restaurants/');
            expect(res.status).toEqual(401);
        });
        it('requires admin privileges', async () => {
            let res = await request.post('/api/restaurants/')
            .set('Authorization', user_token)
            expect(res.status).toEqual(403);
        });

        it("Create restaurant with existing name", async () => {
            let res = await request
            .post('/api/restaurants')
            .set('Authorization', admin_token)
            .send({name: red_lobster.name})
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
            expect(res.body.errors[0].param).toEqual('name')
            expect(res.body.errors[0].msg).toEqual('Restaurant already exists')
        })

        it("Create restaurant with existing slug", async () => {
            let res = await request
            .post('/api/restaurants')
            .set('Authorization', admin_token)
            .send({name: "Red-Lobster"})
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
            expect(res.body.errors[0].param).toEqual('name')
            expect(res.body.errors[0].msg).toEqual('Restaurant already exists')
        })

        it("Create Restaurant", async () => {
            let res = await request
            .post('/api/restaurants')
            .set('Authorization', admin_token)
            .send({name: "yellow Lobster"})
            expect(res.status).toEqual(201)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('slug')
            expect(res.body).toHaveProperty('restaurant_id')
            expect(res.body.name).toEqual('yellow Lobster')
            expect(res.body.slug).toEqual('yellow-lobster')
            
            // Cleanup
            await prisma.restaurants.delete({
                where: {
                    restaurant_id: res.body.restaurant_id
                }
            })
        
        })
    });



    describe('PUT /restaurants/:id', () => {
        let dummy_restaurant;
        beforeAll(async () => {
            dummy_restaurant = await prisma.restaurants.create({
                data: {
                    'name': 'Dummy Restauranto',
                    'slug': 'dummy-restauranto'
                }
            })
        }) 
        it('requires login', async () => {
            let res = await request.put('/api/restaurants/' + dummy_restaurant.restaurant_id);
            expect(res.status).toEqual(401);
        });
        it('requires admin privileges', async () => {
            let res = await request.put('/api/restaurants/' + dummy_restaurant.restaurant_id)
            .set('Authorization', user_token)
            expect(res.status).toEqual(403);
        });

        it('edit an unexisting restaurant', async () => {
            let res = await request.put('/api/restaurants/' + 200)
            .set('Authorization', admin_token)
            .send({
                name: "newname"
            })
            expect(res.status).toEqual(404);
        });

        it('change a restaurant name', async () => {
            let res = await request.put('/api/restaurants/' + dummy_restaurant.restaurant_id)
            .set('Authorization', admin_token)
            .send({
                name: "newname"
            })

            let restaurant = await prisma.restaurants.findUnique({
                where: {
                    restaurant_id: dummy_restaurant.restaurant_id
                }
            })
            expect(restaurant.name).toEqual('newname')
        });

        it('change a restaurant name to an existing restaurant', async () => {
            let res = await request.put('/api/restaurants/' + dummy_restaurant.restaurant_id)
            .set('Authorization', admin_token)
            .send({
                name: red_lobster.name
            })

            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
            expect(res.body.errors[0].param).toEqual('name')
            expect(res.body.errors[0].msg).toEqual('Restaurant already exists')
        });
        it('change a restaurant name to an existing slug', async () => {
            let res = await request.put('/api/restaurants/' + dummy_restaurant.restaurant_id)
            .set('Authorization', admin_token)
            .send({
                name: 'Red-Lobster'
            })

            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('errors')
            expect(Array.isArray(res.body.errors)).toBeTruthy()
            expect(res.body.errors.length).toEqual(1)
            expect(res.body.errors[0]).toHaveProperty('param')
            expect(res.body.errors[0]).toHaveProperty('msg')
            expect(res.body.errors[0].param).toEqual('name')
            expect(res.body.errors[0].msg).toEqual('Restaurant already exists')
        });

        afterAll(async () => {
            // Cleanup
            try {
                
                await prisma.restaurants.delete({
                    where: {
                        restaurant_id: dummy_restaurant.restaurant_id
                    }
                })
            } catch(e) {
                // restaurant was deleted in test
            }
        })
    });
});

afterAll(async () => {
    await prisma.users.deleteMany({});
    await prisma.restaurants.deleteMany({});
})  