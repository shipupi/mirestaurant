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
    let user = user_service.create_user(req.body.name, req.body.email, hashed_password);
};

exports.delete_user = async function(req, res) {
    res.send('NOT IMPLEMENTED: delete user');
};

exports.edit_user = async function(req, res) {
    res.send('NOT IMPLEMENTED: edit user');
};