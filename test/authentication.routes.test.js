const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require('../config/db')

chai.should()
chai.use(chaiHttp)

const email = 'tst@test.com'

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken

describe('Registration', () => {

    before(function () {
        // Before registration, delete our existing dummy data from the database.
        // Ideally we want a separate database for running tests.
        try {
            // const query = 'DELETE FROM `user` WHERE `Email` = ?'
            let query = 'DELETE FROM `spullendelen` WHERE `UserID` = (SELECT `ID` FROM `delers` WHERE `Email` = ?)'
            let values = [email]
            db.query(query, values, (err, rows, fields) => {
                if (err) {
                    console.log(err.toString())
                }
            })

            query = 'DELETE FROM `delers` WHERE `Email` = ?'
            values = [email]
            db.query(query, values, (err, rows, fields) => {
                if (err) {
                    console.log(err.toString())
                }
            })
        } catch (ex) {
            console.log(ex.toString())
        }
    })

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                'firstname':'test',
                'lastname':'testtest',
                'email': email,
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string')

                // Export the aquired token for other testcases.
                validToken = res.body.token
                module.exports = {
                    token: validToken
                }
                done()
            })
    })

    it('should return an error on GET request', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when no email is provided', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                'firstname':'test',
                'lastname':'testtest',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done()
            })
    })

    it('should throw an error when no password is provided', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
            'firstname':'test',
            'lastname':'testtest',
            'email': email
        })
        .end((err, res) => {
            res.should.have.status(412)
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })

    it('should throw an error when no first name is provided', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
            'lastname':'testtest',
            'email': email,
            'password':'secret'
        })
        .end((err, res) => {
            res.should.have.status(412)
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })

    it('should throw an error when no last name is provided', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
            'firstname':'test',
            'email': email,
            'password':'secret'
        })
        .end((err, res) => {
            res.should.have.status(412)
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })
})

describe('Login', () => {

    /**
     * This assumes that a user with given credentials exists. That is the case
     * when registration has been done before login.
     */
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                'email': email,
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string')
                done()
            })
    })

    it('should throw an error when no password is provided', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
            'password': 'secret'
        })
        .end((err, res) => {
            res.should.have.status(412)
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })

    it('should throw an error when no password is provided', (done) => {
        chai.request(server)
        .post('/api/register')
        .send({
            'email': email
        })
        .end((err, res) => {
            res.should.have.status(412)
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })

})