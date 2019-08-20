const { body } = require('express-validator/check');

module.exports = () => {
    return [ 
        body('email').exists()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('Email is invalid'),
        body('password')
        .exists()
        .withMessage('password field is required')
        .isLength({min : 6,max: 24})
        .withMessage('password must be in between 6 to 24 characters long')
       ] 
};
