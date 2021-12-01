const users_orm = require('../persistence/users.orm');

exports.get_users = async function() {
    return users_orm.get_users();
}

exports.create_user = async function(name, email, hashed_password) {
    return users_orm.create_user(name, email, hashed_password);
}