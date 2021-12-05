const users_orm = require('../persistence/users.orm');

exports.get_users = async function() {
    return users_orm.get_users();
}

exports.create_user = async function(name, email, hashed_password) {
    let user =  await users_orm.create_user(name, email, hashed_password);
    delete user['password'];
    return user;
}

exports.patch_user = async function(id, name, email, hashed_password, is_admin) {
    let user = await users_orm.patch_user(id, name, email, hashed_password, is_admin);
    return user;
}

exports.find_by_email = async function(email) {
    return users_orm.find_by_email(email);
}

const find_by_id = async function(id) {
    return users_orm.find_by_id(id);
}
exports.find_by_id = find_by_id;

exports.delete_user = async function(id) {
    let user = await find_by_id(id);
    if (!user) return null;
    return users_orm.delete_user(id);
}