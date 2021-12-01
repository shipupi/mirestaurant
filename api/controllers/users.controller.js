const user_service = require('../services/users.service');
const crypto = require('crypto');

exports.get_users = async function(req, res) {
    let users = await user_service.get_users();
    res.send(users);
};

exports.create_user = async function(req, res) {
    let salt = crypto.randomBytes(32)
    let hash = crypto.createHmac('sha512', salt);
    hash.update(req.body.password);
    let hashed_password = hash.digest('base64');
    try {
        let user = await user_service.create_user(req.body.name, req.body.email, hashed_password);
        res.status(201).json(user.user_id);
    } catch (e) {
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