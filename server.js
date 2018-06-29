const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const ApiError = require('./model/ApiError');
const category_routes = require('./routes/category.routes')

const port = 3000;

app.use('/api', express.static('public')); 

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('*', function(req, res, next){
    next()
})

//in comments because it has not yet been made or in use
//app.use('/api', auth_routes)
//app.all('*', AuthController.validateToken);

//Here follow some regular endpoints
app.use('api/category', category_routes);

app.use((err, req, res, next) => {
	console.dir(err);
    const error = new ApiError("This endpoint doesn't exist", 404);
    next(error);
})

app.listen(port, () => {
	console.log('Server running on port ' + port);
})

module.exports = app;
