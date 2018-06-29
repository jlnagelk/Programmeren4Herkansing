const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const ApiError = require('./model/ApiError')

const port = 3000;

app.use('/api', express.static('public')) 

app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('*', function(req, res, next){
    next()
})
//in comments because it has not yet been made or in use
//app.use('/api', auth_routes)
//app.all('*', AuthController.validateToken);

//Here follow some regular endpoints

app.use((err, req, res, next) => {
	console.dir(err)
	res.status((err.code || 404)).json(err).end()	
})

app.listen(port, () => {
	console.log('Server running on port ' + port)
})

module.exports = app;
