const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/categorie'
const fakeToken = 'faketoken'

describe('categorie API POST', () => {

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

    it('should return a studentenhuis when posting a valid object', (done) => {
        /**
         * require('authentication.test') forces that test to be run before our tests.
         * That provides us with a valid token that we use for authentication our requests.
         */
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(endpointToTest)
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

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(server)
            .get('/api/categorie')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const category = res.body[0]
                category.should.have.property('ID')
                category.should.have.property('naam')
                category.should.have.property('beschrijving')
                category.should.have.property('beheerder')
                category.should.have.property('email')
                done()
            })
    })
})

describe('Studentenhuis API GET one', () => {
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

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(server)
            .get('/api/categorie/1')
            .set('x-access-token', token)
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

    it('should return an error when using an non-existing huisId', (done) => {
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

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .put('/api/categorie/1')
            .set('x-access-token', fakeToken)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return a categorie when posting a valid object', (done) => {
        chai.request(server)
            .put('/api/categorie/1').send({
                'naam': 'Test categorie',
                'beschrijving': 'dit is een test'
            })
            .set('x-access-token', token)
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

    it('should throw an error when trying to edit a category that doesn\'t exist', (done) => {
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
        chai.request(server)
            .put('/api/categorie/1').send({
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
    })

    it('should throw an error when adres is missing', (done) => {
        chai.request(server)
            .put('/api/categorie/1').send({
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
    })
})

describe('Studentenhuis API DELETE', () => {
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

    it.skip('should delete a categorie when posting a valid object', (done) => {
        chai.request(server)
            .delete('/api/categorie/1')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
            })
    })

    it('should delete a categorie when posting a valid object', (done) => {
        chai.request(server)
            .delete('/api/categorie/999')
            .set('x-access-token', token)
            .end((err, res) => {
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
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