const restaurants_orm = require('../persistence/restaurants.orm');

exports.get_restaurants = async function() {
    return restaurants_orm.get_restaurants();
}

exports.create_restaurant = async function(name, email, hashed_password) {
    return restaurants_orm.create_restaurant(name, email, hashed_password);
}

exports.find_by_name = async function(name) {
    return restaurants_orm.find_by_name(name);
}

const find_by_id = async function(id) {
    console.log("attempting to find restaurant: ", id);
    return restaurants_orm.find_by_id(id);
}
exports.find_by_id = find_by_id;

exports.delete_restaurant = async function(id) {
    let restaurant = await find_by_id(id);
    if (!restaurant) return null;
    return restaurants_orm.delete_restaurant(id);
}

exports.rate = async function(restaurant_id, user_id, rating, comment) {

}