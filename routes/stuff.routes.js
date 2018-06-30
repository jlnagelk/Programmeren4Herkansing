let express = require('express');
let routes = express.Router();
let stuffController = require('../controllers/stuff.controller');

//get methods for stuff
routes.get('/categorie/:IDCategory/spullen', stuffController.getAll)
routes.get('/categorie/:IDCategory/spullen/:IDStuff', stuffController.getWithID)

//post method for stuff
routes.post('/categorie/:IDCategory/spullen', stuffController.create)

//put method for stuff
routes.put('/categorie/:IDCategory/spullen/:IDStuff', stuffController.put)

//delete method for stuff
routes.delete('/categorie/:IDCategory/spullen/:IDStuff', stuffController.delete)