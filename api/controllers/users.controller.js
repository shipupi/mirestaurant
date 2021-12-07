const user_service = require('../services/users.service');
const auth_middleware = require('../middleware/auth.middleware');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


exports.get_users = async function(req, res) {
    let users = await user_service.get_users();
    res.send(users);
};

exports.get_by_id = async function(req, res) {
    let user_id = parseInt(req.params.user_id);
    let user = await user_service.find_by_id(user_id);
    if (!user) {
        return res.status(404).send();
    }
    delete user['password']
    res.send(user);
};

exports.create_user = async function(req, res) {
    let hashed_password = auth_middleware.hash_password(req.body.password);
    try {
        let user = await user_service.create_user(req.body.name, req.body.email, hashed_password);
        let token = create_token(user);
        res.status(201).json({
            access_token: token,
            user: user
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Unable to create user.");
    }
};

exports.delete_user = async function(req, res) {
    let user_id = parseInt(req.params.user_id);
    if (user_id == req.logged_user.user_id) {
        return res.status(400).send("Cannot delete authenticated user");
    }
    try {
        let user_deletion = await user_service.delete_user(user_id);
        if (user_deletion) {
            res.status(204).send();
        } else {
            res.status(404).send({
                message: `User with id ${user_id} does not exist`
            })
        }
    } catch (e) {
        res.status(500).send("Unable to delete user.");
    }
};

exports.patch_user = async function(req, res) {
    let user_id = parseInt(req.params.user_id);
    let user = await user_service.find_by_id(user_id);
    if (!user) {
        return res.status(404).send();
    }
    if (req.body.password) {
        req.body.password = auth_middleware.hash_password(req.body.password);
    }
    try {
        let user = await user_service.patch_user(user_id, req.body.name, req.body.email, req.body.password, req.body.is_admin);
        res.send(user);
    } catch (e) {
        console.log(e)
        res.status(500).send("Unable to patch user.");
    }
};

const create_token = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
}

exports.generate_jwt = async function(req, res) {
    let token = create_token(req.body.user);
    return res.status(200).send(
        {
            access_token: token,
            user: req.body.user
        }
    );
    
}