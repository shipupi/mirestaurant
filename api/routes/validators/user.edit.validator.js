const user_service = require('../../services/users.service');

exports.userEditValidator = {
    name: {
        optional: true,
        isLength: {
            options: {
                min: 3,
                max: 49
            }
        },
        errorMessage: 'Must have between 3 and 49 characters',
        trim: true,
        escape: true
    },
    email: {
        optional: true,
        trim: true,
        escape: true,
        isEmail: true,
        normalizeEmail: true,
        isLength: {
            options: {
                max: 49
            }
        },
        errorMessage: 'Must be a valid email address',
        custom: {
            options: async (value, {req}) => {
                maybe_user = await user_service.find_by_email(value);
                if (maybe_user && maybe_user.user_id != req.params.user_id) {
                    return Promise.reject("Email already in use");
                }
            }
        },
        trim: true,

    },
    password: {
        optional: true,
        isLength: {
            options: {
                max: 49,
            }
        },
        isStrongPassword: {},
        errorMessage: 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number and one symbol',
    },
    is_admin: {
        optional: true,
        isBoolean: {options: {strict: true}},
        custom: {
            options: async (value, {req}) => {
                let user_id = parseInt(req.params.user_id);
                let user = await user_service.find_by_id(user_id);
                console.log("Validating user", user.user_id, value, req.logged_user)
                if (user && req.logged_user.user_id == user.user_id && value === false) {
                    return Promise.reject("Cannot revoke admin powers from yourself");
                }
            }
        },
    }
}