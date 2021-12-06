const restaurant_service = require('../../services/restaurants.service');

exports.rate_validator = {
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
        },
        toInt: true
    },
    comment: {
        notEmpty: false,
        isLength: {
            options: {
                min: 3,
                max: 255,
            }
        },
        errorMessage: 'Comment must be between 3 and 255 characters',
        escape: true,
        trim: true
    },
}