const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require('../config/db')

chai.should()
chai.use(chaiHttp)

const fakeToken = 'faketoken'

describe('Stuff API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('/api/categorie/1/spullen')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return stuff when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie/1/spullen/')
            .set('x-access-token', token)
            .send({
                'naam': 'test',
                'beschrijving': 'dit is een test beschrijving',
                'merk': 'testmerk',
                "soort": 'test soort',
                "bouwjaar": 2018
            })
            .end((err, res) => {
                res.should.have.status(200)

                const stuff = res.body[0]
                stuff.should.have.property('ID')
                stuff.should.have.property('naam')
                stuff.should.have.property('beschrijving')
                stuff.should.have.property('soort')
                stuff.should.have.property('bouwjaar')
                done()
            })
    })

    it('should throw an error when beschrijving is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie/1/spullen')
            .set('x-access-token', token)
            .send({
                'naam': 'test',
                'merk': 'testmerk',
                "soort": 'test soort',
                "bouwjaar": 2018
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .post('/api/categorie/1/spullen')
            .set('x-access-token', token)
            .send({
                'merk': 'testmerk',
                'beschrijving': 'dit is een test beschrijving',
                "soort": 'test soort',
                "bouwjaar": 2018
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when soort is missing', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .post('/api/categorie/1/spullen')
            .set('x-access-token', token)
            .send({
                'naam': 'test',
                'merk': 'testmerk',
                'beschrijving': 'dit is een test beschrijving',
                "bouwjaar": 2018
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when merk is missing', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .post('/api/categorie/1/spullen')
            .set('x-access-token', token)
            .send({
                'naam': 'test',
                'soort': 'testsoort',
                'beschrijving': 'dit is een test beschrijving',
                "bouwjaar": 2018
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when bouwjaar is missing', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .post('/api/categorie/1/spullen')
            .set('x-access-token', token)
            .send({
                'naam': 'test',
                'soort': 'testsoort',
                'beschrijving': 'dit is een test beschrijving',
                'merk': 'testmerk'
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when trying to add stuff to a category that doesn\'t exist', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .post('/api/categorie/999/spullen')
            .set('x-access-token', token)
            .send({
                'naam': 'test',
                'soort': 'testsoort',
                'beschrijving': 'dit is een test beschrijving',
                'merk': 'testmerk',
                'bouwjaar': 2018
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })

})

describe('spullen API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .get('/api/categorie/1/spullen')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return all stuff when using a valid token', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .get('/api/categorie/1/spullen')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)

                const stuff = res.body[0]
                stuff.should.have.property('ID')
                stuff.should.have.property('naam')
                stuff.should.have.property('beschrijving')
                stuff.should.have.property('soort')
                stuff.should.have.property('bouwjaar')
                done()
            })
    })

    it('should throw an error when trying to get stuff from a category that doesn\'t exist', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .get('/api/categorie/999/spullen')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })
})

describe('spullen API GET one', () => {

    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/categorie/1/spullen/1')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return the correct stuff when using an existing ID', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .get('/api/categorie/1/spullen/1')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)

                const stuff = res.body[0]
                stuff.should.have.property('ID')
                stuff.should.have.property('naam')
                stuff.should.have.property('beschrijving')
                stuff.should.have.property('soort')
                stuff.should.have.property('bouwjaar')
                done()
            })
    })

    it('should return an error when using an non-existing categorieID', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .get('/api/categorie/999/spullen/1')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return an error when using an non-existing stuffID', (done) => {
        const token = require('./authentication.routes.test').token

        chai.request(server)
            .get('/api/categorie/1/spullen/999')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })
})

describe('Spullen API PUT', () => {

    it('should throw an error when using invalid JWT token', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    const validID = rows[0].ID

                    chai.request(server)
                        .put('/api/categorie/1/spullen/' + validID).send({
                            'naam': 'test2',
                            'beschrijving': 'dit is nog een test beschrijving',
                            'merk': 'testmerk2',
                            "soort": 'test soort 2',
                            "bouwjaar": 2019
                        })
                        .set('x-access-token', fakeToken)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(401)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })

    it('should return a categorie when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    validID = rows[0].ID
                    chai.request(server)
                        .put('/api/categorie/1/spullen/' + validID).send({
                            'naam': 'test2',
                            'beschrijving': 'dit is nog een test beschrijving',
                            'merk': 'testmerk2',
                            "soort": 'test soort 2',
                            "bouwjaar": 2019
                        })
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200)

                            const stuff = res.body[0]
                            stuff.should.have.property('ID')
                            stuff.should.have.property('naam')
                            stuff.should.have.property('beschrijving')
                            stuff.should.have.property('soort')
                            stuff.should.have.property('bouwjaar')
                            done()

                        })
                }
            })
    })

    it('should throw an error when trying to edit a category that doesn\'t exist', (done) => {
        const token = require('./authentication.routes.test').token

        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .put('/api/categorie/999/spullen/' + validID).send({
                            'naam': 'test2',
                            'beschrijving': 'dit is nog een test beschrijving',
                            'merk': 'testmerk2',
                            "soort": 'test soort 2',
                            "bouwjaar": 2019
                        })
                        .set('x-access-token', token)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(404)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })

    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .put('/api/categorie/1/spullen/' + validID).send({
                            'beschrijving': 'dit is nog een test beschrijving',
                            'merk': 'testmerk2',
                            "soort": 'test soort 2',
                            "bouwjaar": 2019
                        })
                        .set('x-access-token', token)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(412)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })

    it('should throw an error when beschrijving is missing', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .put('/api/categorie/1/spullen/' + validID).send({
                            'naam': 'test2',
                            'merk': 'testmerk2',
                            "soort": 'test soort 2',
                            "bouwjaar": 2019
                        })
                        .set('x-access-token', token)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(412)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })

    it('should throw an error when beschrijving is missing', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .put('/api/categorie/1/spullen/' + validID).send({
                            'naam': 'test2',
                            'merk': 'merk2',
                            "soort": 'test soort 2',
                            "bouwjaar": 2019
                        })
                        .set('x-access-token', token)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(412)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })

    it('should throw an error when merk is missing', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .put('/api/categorie/1/spullen/' + validID).send({
                            'naam': 'test2',
                            'beschrijving': 'dit is nog een beschrijving',
                            "soort": 'test soort 2',
                            "bouwjaar": 2019
                        })
                        .set('x-access-token', token)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(412)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })
})

describe('Stuff API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .delete('/api/categorie/1/spullen/' + validID)
                        .set('x-access-token', fakeToken)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(401)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })

    it('should delete stuff when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .delete('/api/categorie/1/spullen/' + validID)
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200)
                            done()
                        })
                }
            })
    })

    it('should throw an error when posting an invalid categoryID', (done) => {
        const token = require('./authentication.routes.test').token
        db.query('SELECT * FROM spullen ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let validID = rows[0].ID
                    chai.request(server)
                        .delete('/api/categorie/999/spullen/' + validID)
                        .set('x-access-token', token)
                        .end((err, res) => {
                            const error = res.body
                            error.should.have.property('message')
                            error.should.have.property('code').equals(404)
                            error.should.have.property('datetime')
                            done()
                        })
                }
            })
    })


    it('should throw an error when posting an invalid categoryID', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete('/api/categorie/1/spullen/999')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })

})