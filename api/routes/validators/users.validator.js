const user_service = require('../../services/users.service');

exports.userValidator = {
    name: {
        isLength: {
            min: 3,
            max: 49
        },
        errorMessage: 'Must have between 3 and 49 characters',
        trim: true,
        escape: true
    },
    email: {
        normalizeEmail: true,
        trim: true,
        escape: true,
        isEmail: true,
        isLength: {
            max: 49
        },
        errorMessage: 'Must be a valid email address',
        custom: {
            options: async (value) => {
                maybe_user = await user_service.find_by_email(value);
                if (maybe_user) {
                    return Promise.reject("Email already in use");
                }
            }
        },
        trim: true,

    },
    password: {
        isLength: {
            max: 49,
        },
        isStrongPassword: {},
        errorMessage: 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number and one symbol',
    },
}