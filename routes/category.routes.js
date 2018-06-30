let express = require('express');
let routes = express.Router();
let categoryController = require('../controllers/category.controller');

//get methods for category
routes.post('/categorie', categoryController.addCategory);

//post methods for category
routes.get('/categorie', categoryController.getAllCategories);
routes.get('/categorie/:IDCategory', categoryController.getCategoryByID);

//put methods for category
routes.put('categorie/:IDCategory',categoryController.editCategoryByID);

//delete methods for category
routes.delete('categorie/:IDCategory',categoryController.deleteCategoryByID);

module.exports = routes;