const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const token = require('./authentication.routes.test').token
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
        chai.request(server)
            .post('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const category = res.body
                category.should.have.property('voornaam')
                category.should.have.property('achternaam')
                category.should.have.property('email')
                done()
            })
    })


    it('should throw an error when a user is already signed up', (done) => {
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
        chai.request(server)
            .get('/api/categorie/1/spullen/1/delers')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const user = res.body
                user.should.have.property('voornaam')
                user.should.have.property('achternaam')
                user.should.have.property('email')

                done()
            })
    })

    it('should throw an error when categorie does not exists', (done) => {
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