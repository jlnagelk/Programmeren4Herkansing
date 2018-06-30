let express = require('express');
let routes = express.Router();
let sharersController = require('../controllers/sharers.controller');

//get method for sharers
routes.get('/categorie/:IDCategory/spullen/:IDStuff/delers', sharersController.get)

//post method for sharers
routes.post('/categorie/:IDCategory/spullen/:IDStuff/delers', sharersController.create)

//delete method for sharers
routes.delete('/categorie/:IDCategory/spullen/:IDStuff/delers', sharersController.delete)

module.exports = routes;