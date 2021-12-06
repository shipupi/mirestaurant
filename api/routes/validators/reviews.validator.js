const restaurant_service = require('../../services/restaurants.service');

exports.reviewValidator = {
    restaurant_id: {
        custom: {
            options: async (value) => {
                try {
                    const restaurant_id_message = "restaurant_id must be a number greater than 0";
                    let restaurant_id = parseInt(value);
                    if (restaurant_id <= 0) {
                        return Promise.reject(restaurant_id_message);    
                    }
                    maybe_restaurant = await restaurant_service.find_by_id(restaurant_id);
                    if (!maybe_restaurant) {
                        return Promise.reject("Restaurant does not exist");
                    }
                } catch (e) {
                    return Promise.reject(restaurant_id_message);
                }
                
            }
        }
    },
    rating: {
        custom: {
            options: async (value) => {
                try {
                    const rating_message = "rating must be a number between 1 and 5";
                    let rating = parseInt(value);
                    if (rating <= 0 || rating > 5) {
                        return Promise.reject(rating_message);    
                    }
                } catch (e) {
                    return Promise.reject(rating_message);
                }
            }
        }
    },
    comment: {
        notEmpty: false,
        isLength: {
            options: {
                max: 255,
                min: 3
            }
        },
        errorMessage: 'Comment must be between 3 and 255 characters',
        escape: true,
        trim: true
    },
}