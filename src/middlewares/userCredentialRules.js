const { body, validationResult } = require('express-validator');

const userCredentialsValidationRules = () => {
    return [
        body('username').isLength({ min: 5 }),
        body('password').isLength({ min: 5 }),
    ];
}

const userCredentialsValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(200).json({
        errCode: -1,
        errMessage: "Failed to validate the username and password strength..!!",
        data: "",
    })
}

module.exports = {
    userCredentialsValidationRules,
    userCredentialsValidate,
}