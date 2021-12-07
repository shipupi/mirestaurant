const restaurant_service = require('../../services/restaurants.service');

exports.restaurant_validator = {
    name: {
        isLength: {
            options: {
                min: 3,
                max: 49
            }
        },
        custom: {
            options: async (value, {req}) => {
                maybe_restaurant = await restaurant_service.find_by_name(value);
                maybe_restaurant2 = await restaurant_service.find_by_slug(restaurant_service.get_slug(value))
                if (maybe_restaurant && maybe_restaurant.restaurant_id != req.params.restaurant_id) {
                    return Promise.reject("Restaurant already exists");
                }
                if (maybe_restaurant2 && maybe_restaurant2.restaurant_id != req.params.restaurant_id) {
                    return Promise.reject("Restaurant already exists");
                }
            }
        },
        errorMessage: 'Name must have between 3 and 49 characters',
        trim: true,
        escape: true
    }
}