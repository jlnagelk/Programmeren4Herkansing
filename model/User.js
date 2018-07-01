
const assert = require('assert')
const ApiError = require('./ApiError')
const bcrypt = require('bcryptjs');
const validateEmail = require('../util/emailvalidator')

class User {
    
    constructor(firstname, lastname, email, password) {
        console.log('User constructor called')
        try{
            assert(typeof (firstname) === 'string', 'firstname must be a string.')
            assert(typeof (lastname) === 'string', 'lastname must be a string.')
            assert(typeof (email) === 'string', 'email must be a string.')
            assert(typeof (password) === 'string', 'password must be a string.')
            assert(firstname.trim().length > 2, 'firstname must be at least 3 characters.')
            assert(lastname.trim().length > 2, 'lastname must be at least 3 characters.')
            assert(validateEmail(email.trim()), 'email must be a valid emailaddress.')
            assert(password.trim().length > 2, 'password must be at least 3 characters.')
        } catch (ex) {
            console.log(ex.toString())
            throw (new ApiError(ex.toString(), 412))
        }
        this.name = {
            firstname: firstname.trim(), //trim removes whitespace in front and at end
            lastname: lastname.trim()
        }
        this.email = email.trim()
        //Encrypt the password
        this.password = bcrypt.hashSync(password.trim(), 8);
    }
}

User.prototype.toString = function userToString() {
    var copy = Object.assign({}, this);
    delete copy.password
    return copy
}

module.exports = User;