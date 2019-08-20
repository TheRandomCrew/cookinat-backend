const { body } = require('express-validator/check')

const validateSignUpDiner = () => {
    return [ 
        body('last_name')
        .withMessage('Last Name field is required')
        .isLength({min:3}),
        body('first_name')
        .withMessage('First Name field is required')
        .isLength({min:3})
        .withMessage('name must be greater than 3 letters'),
        body('email')
        .exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid'),
        body('password')
        .exists()
        .withMessage('password field is required')
        .isLength({min : 6})
        .withMessage('password must be in between 8 to 12 characters long'),
        body('nickname')
        .isString(),
        body('phone_number')
        .isString()
       ] 
}

module.exports = validateSignUpDiner;