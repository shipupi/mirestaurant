const restaurant_service = require('../../services/restaurants.service');

exports.restaurantValidator = {
    name: {
        isLength: {
            min: 3,
            max: 49
        },
        custom: {
            options: async (value) => {
                maybe_restaurant = await restaurant_service.find_by_name(value);
                if (maybe_restaurant) {
                    return Promise.reject("Restaurant already exists");
                }
            }
        },
        errorMessage: 'Name must have between 3 and 49 characters',
        trim: true,
        escape: true
    }
}