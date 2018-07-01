let express = require('express');
let routes = express.Router();
let stuffController = require('../controllers/stuff.controller');

//get methods for stuff
routes.get('/categorie/:IDCategory/spullen', stuffController.getAll)
routes.get('/categorie/:IDCategory/spullen/:IDStuff', stuffController.getStuffByID)

//post method for stuff
routes.post('/categorie/:IDCategory/spullen', stuffController.postStuff)

//put method for stuff
routes.put('/categorie/:IDCategory/spullen/:IDStuff', stuffController.editStuffByID)

//delete method for stuff
routes.delete('/categorie/:IDCategory/spullen/:IDStuff', stuffController.deleteStuffByID)

module.exports = routes;