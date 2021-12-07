const user_service = require('../services/users.service');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const hash_password = (password, salt) => {
    if(!salt) {
        salt = crypto.randomBytes(32).toString('base64');
    }
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return  salt + '$' + hash.digest('base64');
}
exports.hash_password = hash_password;

exports.authenticate = async (req, res, next) => {
    let user =  await user_service.find_by_email(req.body.email)
    if (!user) {
        console.log("No user found");
        return res.status('401').send({'errors': 'Invalid email or password'});
    }
    let [salt, existing_hash] = user.password.split('$');
    let [_, hashed_password]  = hash_password(req.body.password, salt).split('$');
    if (hashed_password != existing_hash) {
        return res.status('401').send({'errors': 'Invalid email or password'});
    }
    delete user['password'];
    req.body = { user };
    return next();
 };

 exports.validJWT = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).send();
    }
    let split_auth = req.headers['authorization'].split(' ');
    if (split_auth.length != 2) {
        console.log("Incorrect bearer");
        res.status(401).send();
    }
    if (split_auth[0] !== 'Bearer') {
        console.log("Incorrect bearer");
        return res.status(401).send();
    }
    try {
        req.logged_user = jwt.verify(split_auth[1], process.env.JWT_SECRET);
        return next();
    } catch (e) {
        return res.status(403).send();
    }
}; 

exports.processJWT = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next();
    }
    let split_auth = req.headers['authorization'].split(' ');
    if (split_auth.length != 2) {
        return next();
    }
    if (split_auth[0] !== 'Bearer') {
        return next();
    }
    try {
        req.logged_user = jwt.verify(split_auth[1], process.env.JWT_SECRET);
        return next();
    } catch (e) {
        return next();
    }
}; 

exports.adminOnly = (req, res, next) => {
    if (req.logged_user.is_admin) {
        return next();
    }
    return res.status(403).send();
}