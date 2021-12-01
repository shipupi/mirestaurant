exports.userCreationValidator = {
    name: {
        isLength: {
            min: 3,
            max: 49
        },
        errorMessage: 'Must have between 3 and 49 characters'
    },
    email: {
        isEmail: true,
        isLength: {
            max: 49
        },
        errorMessage: 'Must be a valid email address'
    },
    password: {
        isLength: {
            max: 49,
        },
        isStrongPassword: {},
        errorMessage: 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number and one symbol',
    },
}