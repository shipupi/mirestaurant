const reviews_orm = require('../persistence/reviews.orm');

exports.get_reviews = async function() {
    return reviews_orm.get_reviews();
}

exports.create_review = async function(restaurant_id, user_id, rating, comment) {
    return reviews_orm.create_review(restaurant_id, user_id, rating, comment);
}

const find_by_id = async function(id) {
    return reviews_orm.find_by_id(id);
}
exports.find_by_id = find_by_id;

exports.delete_review = async function(id) {
    let review = await find_by_id(id);
    if (!review) return null;
    return reviews_orm.delete_review(id);
}