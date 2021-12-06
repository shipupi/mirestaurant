const restaurants_orm = require('../persistence/restaurants.orm');


const round = (n) => {
    return Math.round((n + Number.EPSILON)  * 100) / 100
}

exports.get_restaurants = async function() {
    let restaurants = await restaurants_orm.get_restaurants();
    return restaurants.map(restaurant => {
        if (restaurant.reviews.length) {
            restaurant.rating = round(restaurant.reviews.reduce((a, b) => a + b.rating, 0) / restaurant.reviews.length)
            delete restaurant["reviews"]
        } else {
            restaurant.rating = -1
            delete restaurant["reviews"]
        }
        return restaurant
        
    }).sort((a,b) => b.rating - a.rating);
}

exports.create_restaurant = async function(name) {
    let slug = getSlug(name);
    let maybe_restaurant = await this.find_by_slug(slug);
    if (maybe_restaurant) {
        return null;
    }
    return restaurants_orm.create_restaurant(name, slug);
}

exports.edit_restaurant = async function(id, name) {
    let slug = getSlug(name);
    let maybe_restaurant = await this.find_by_slug(slug);
    if (maybe_restaurant && maybe_restaurant.restaurant_id != id) {
        return null;
    }
    return restaurants_orm.edit_restaurant(id, name, slug);
}

exports.find_by_name = async function(name) {
    return restaurants_orm.find_by_name(name);
}

const find_by_slug = async function(slug, is_admin) {
    let restaurant = await restaurants_orm.find_by_slug(slug);
    if (!restaurant) {
        return null;
    }
    if (restaurant.reviews.length > 0) {
        restaurant.rating = round(restaurant.reviews.reduce((a, b) => a + b.rating, 0) / restaurant.reviews.length)
        restaurant.reviews.sort((a, b) => b.date - a.date)
        let latest = restaurant.reviews[0];
        restaurant.reviews.sort((a, b) => b.rating - a.rating)
        let highest = restaurant.reviews[0];
        let lowest = restaurant.reviews[restaurant.reviews.length - 1]
        if (is_admin) {
            restaurant.all_reviews = restaurant.reviews
        }
        restaurant.reviews = {
            highest: highest,
            lowest: lowest,
            latest: latest
        }
        restaurant.reviews.highest.user = restaurant.reviews.highest.users.name
        restaurant.reviews.lowest.user = restaurant.reviews.lowest.users.name
        restaurant.reviews.latest.user = restaurant.reviews.latest.users.name
        delete restaurant.reviews.highest.users
        delete restaurant.reviews.lowest.users
        delete restaurant.reviews.latest.users
    }
    return restaurant;
}
exports.find_by_slug = find_by_slug;

const find_by_id = async function(id) {
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


// https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
const getSlug = function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
             .replace(/\s+/g, '-') // collapse whitespace and replace by -
             .replace(/-+/g, '-'); // collapse dashes
  
    return str;
  };