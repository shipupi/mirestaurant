const user_service = require('../services/users.service');
const auth_middleware = require('../middleware/auth.middleware');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


exports.get_users = async function(req, res) {
    let users = await user_service.get_users();
    res.send(users);
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

exports.edit_user = async function(req, res) {
    let user_id = parseInt(req.params.user_id);
    res.send('NOT IMPLEMENTED: edit user');
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