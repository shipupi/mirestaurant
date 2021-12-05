exports.login_validator = {
    email: {
        trim: true,
        escape: true,
        isEmail: true,
        normalizeEmail: true,
        isLength: {
            options: {
                max: 49
            }
        },
        errorMessage: 'Invalid username or password',
        trim: true,
        escape: true
    },
    password: {
        isLength: {
            options: {
                max: 49
            }
        },
        errorMessage: 'Invalid username or password',
    }
}