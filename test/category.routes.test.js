const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require('../config/db')

chai.should()
chai.use(chaiHttp)

const fakeToken = 'faketoken'
describe('categorie API POST', () => {

    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('/api/categorie')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return a category when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie')
            .set('x-access-token', token)
            .send({
                'naam': 'Test categorie',
                'beschrijving': 'dit is een test'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const category = res.body
                category.should.have.property('ID')
                category.should.have.property('naam')
                category.should.have.property('beschrijving')
                category.should.have.property('beheerder')
                category.should.have.property('email')

                done()
            })
    })

    it('should throw an error when beschrijving is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie')
            .set('x-access-token', token)
            .send({
                'name': "test"
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when adres is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie')
            .set('x-access-token', token)
            .send({
                'beschrijving': "test"
            })
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')
                done()
            })
    })
})

describe('categorie API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/categorie')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return all categories when using a valid token', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get('/api/categorie')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)

                const category = res.body[0]
                category.should.have.property('ID')
                category.should.have.property('Naam')
                category.should.have.property('Beschrijving')
                category.should.have.property('Beheerder')
                category.should.have.property('Email')
                done()
            })
    })
})

describe('Category API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/categorie/1')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return the correct category when requesting a valid ID', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get('/api/categorie/1')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)

                const category = res.body
                category.should.have.property('ID')
                category.should.have.property('naam')
                category.should.have.property('beschrijving')
                category.should.have.property('beheerder')
                category.should.have.property('email')
                done()
            })
    })

    it('should return an error when using an non-existing ID', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get('/api/categorie/999')
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

describe('categorie API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {

        db.query('SELECT * FROM categorie ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let categoryID = rows[0].ID
                    chai.request(server)
                        .put('/api/categorie/' + categoryID)
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

        db.query('SELECT * FROM categorie ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {

                    let categoryID = rows[0].ID
                    const token = require('./authentication.routes.test').token
                    chai.request(server)
                        .put('/api/categorie/' + categoryID).send({
                            'naam': 'Test categorie2',
                            'beschrijving': 'dit is een test'
                        })
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200)

                            const category = res.body[0]
                            category.should.have.property('ID')
                            category.should.have.property('Naam')
                            category.should.have.property('Beschrijving')
                            category.should.have.property('Beheerder')
                            category.should.have.property('Email')
                            done()
                        })
                }
            })
    })

    it('should throw an error when trying to edit a category that doesn\'t exist', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put('/api/categorie/999').send({
                'naam': 'Test categorie',
                'beschrijving': 'dit is een test'
            })
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {

        db.query('SELECT * FROM categorie ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let categoryID = rows[0].ID

                    const token = require('./authentication.routes.test').token
                    chai.request(server)
                        .put('/api/categorie/' + categoryID).send({
                            'beschrijving': 'dit is een test'
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

        db.query('SELECT * FROM categorie ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let categoryID = rows[0].ID
                    const token = require('./authentication.routes.test').token
                    chai.request(server)
                        .put('/api/categorie/' + categoryID).send({
                            'naam': 'test'
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

describe('Categorie API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('/api/categorie/1')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should delete a categorie when deleting a valid object', (done) => {
        db.query('SELECT * FROM categorie ORDER BY ID DESC',
            (err, rows, fields) => {
                if (err) {

                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    let categoryID = rows[0].ID
                    const token = require('./authentication.routes.test').token
                    chai.request(server)
                        .delete('/api/categorie/' + categoryID)
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                        })
                }
                done()
            })
    })

    it('should throw an error when trying to acces a category that doesn\'t exist', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete('/api/categorie/999')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('/api/categorie')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

})