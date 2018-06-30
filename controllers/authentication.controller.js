const ApiError = require('../model/ApiError')
const assert = require('assert')

module.exports = {

    /**
     * Authenticate the incoming request by validating the JWT token. 
     * On success, we pass further processing to the next express handler.
     * 
     * https://www.sitepoint.com/using-json-web-tokens-node-js/
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res None. The request is passed to next for further processing.
     * @param {*} next ApiError when token is invalid, or req containing logged-in user.
     */
    validateToken(req, res, next) {

    },

    /**
     * User login
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    login(req, res, next) {

    },

    /**
     * Register user
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    register(req,res,next){

    }


}