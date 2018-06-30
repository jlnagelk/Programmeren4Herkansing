const express = require('express');
var http = require('http')
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const ApiError = require('./model/ApiError');
const category_routes = require('./routes/category.routes')
const auth_routes = require('./routes/authentication.routes')
const sharers_routes = require('./routes/sharers.routes')
const stuff_routes = require('./routes/stuff.routes')
const AuthController = require('./controllers/authentication.controller')
const settings = require('./config/config')

const port = process.env.PORT || settings.webPort;


app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('*', function(req, res, next){
    next()
})

//in comments because it has not yet been made or in use
app.use('/api', auth_routes)
app.all('*', AuthController.validateToken);

//Here follow some regular endpoints
app.use('/api', category_routes);
// app.use('/api', sharers_routes)
// app.use('/api', stuff_routes)

app.use('*', function(req, res, next) {
    console.log("Non-existing endpoint.")
    const error = new ApiError("This endpoint doesn't exist", 404);
    next(error);
})

app.use((err, req, res, next) => {
	console.dir(err)
	res.status((err.code || 404)).json(err).end()	
})

app.listen(port, () => {
	console.log('Server running on port ' + port);
})

module.exports = app;
