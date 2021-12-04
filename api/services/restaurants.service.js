const restaurants_orm = require('../persistence/restaurants.orm');

exports.get_restaurants = async function() {
    return restaurants_orm.get_restaurants();
}

exports.create_restaurant = async function(name) {
    let slug = getSlug(name);
    let maybe_restaurant = await this.find_by_slug(slug);
    if (maybe_restaurant) {
        return null;
    }
    return restaurants_orm.create_restaurant(name, slug);
}

exports.find_by_name = async function(name) {
    return restaurants_orm.find_by_name(name);
}

const find_by_slug = async function(slug) {
    return restaurants_orm.find_by_slug(slug);
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