const restaurant_service = require('../../services/restaurants.service');

exports.reviewEditValidator = {
    rating: {
        optional: true,
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
        optional: true,
        notEmpty: false,
        isLength: {
            options: {
                min: 3,
                max: 255
            }
        },
        errorMessage: 'Comment must be between 3 and 255 characters',
        escape: true,
        trim: true
    },
}