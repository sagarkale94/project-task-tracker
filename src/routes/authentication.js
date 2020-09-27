const express = require('express');
const router = express.Router();
const { userCredentialsValidationRules, userCredentialsValidate } = require('../middlewares/userCredentialRules');
const Authentication = require('../controllers/authentication');

/**
* @swagger
*  /login:
*    post:
*      summary: Login User.
*      consumes:
*        - application/json
*      tags:
*        - Authentication
*      parameters:
*        - in: body
*          name: body
*          description: login body.
*          schema:
*            type: object
*            required:
*              - username
*              - password
*            properties:
*              username:
*                type: string
*              password:
*                type: string
*      responses:
*        200:
*          description: success
*/
router.post('/login', userCredentialsValidationRules(), userCredentialsValidate, (req, res) => {
    Authentication.login(req, res);
});

module.exports = router;
