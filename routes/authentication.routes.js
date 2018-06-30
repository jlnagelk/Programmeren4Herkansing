//
// authentication.routes.js
//

let express = require('express');
let routes = express.Router();
let authenticationController = require('../controllers/authentication.controller');

//login & register methods
routes.post('/login', authenticationController.login)
routes.post('/register', authenticationController.register)

module.exports = routes