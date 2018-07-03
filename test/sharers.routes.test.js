const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
chai.should()
chai.use(chaiHttp)

const fakeToken = 'faketoken'

describe('deler API POST', () => {

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

    it('should return a user when user signed up', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                //res.body.should.be.a('object')

                const category = res.body[0]
                category.should.have.property('Voornaam')
                category.should.have.property('Achternaam')
                category.should.have.property('Email')
                done()
            })
    })


    it('should throw an error when a user is already signed up', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(409)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when categorie does not exists', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie/999/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when spul does not exists', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post('/api/categorie/1/spullen/999/delers')
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

describe('deler API GET', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })


    it('should return a correct user when requesting with valid IDs', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                //res.body.should.be.a('object')

                const user = res.body[0]
                user.should.have.property('Voornaam')
                user.should.have.property('Achternaam')
                user.should.have.property('Email')

                done()
            })
    })

    it('should throw an error when categorie does not exists', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get('/api/categorie/999/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })
    it('should throw an error when spul does not exists', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get('/api/categorie/1/spullen/999/delers')
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

describe('deler API DELETE', () => {

    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })


    it('should delete deler when using valid ids', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when using invalid categorie', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete('/api/categorie/999/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when using invalid spul', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete('/api/categorie/1/spullen/999/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when using valid categorie and spul but user not signed up', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .delete('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(409)
                error.should.have.property('datetime')
                done()
            })
    })

})