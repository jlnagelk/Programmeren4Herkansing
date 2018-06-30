const ApiError = require('../model/ApiError')
const assert = require('assert')
const auth = require('../util/auth/authentication')
const bcrypt = require('bcryptjs')
const validateEmail = require('../util/emailvalidator')
const path = require('path')
const db = require('../config/db')
const User = require('../model/User')

module.exports = {

    /**
     * Authenticate the incoming request by validating the JWT token. 
     * On success, we pass further processing to the next express handler.
     * 
     * https://www.sitepoint.com/using-json-web-tokens-node-js/
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res None. The request is passed to next for further processing.
     * @param {*} next ApiError when token is invalid, or req containing logged-in user.
     */
    validateToken(req, res, next) {
        console.log('validateToken called')

        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                console.log('auth.decode - ' + err.message || err)
                const error = new ApiError(err.message || err, 401)
                next(error)
            } else {
                console.log('Authenticated! Payload = ' + payload)

                req.user = {
                    id: payload.sub.id
                }
                console.log('req.user = ' + req.user)
                next()
            }
        })

    },

    /**
     * User login
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    login(req, res, next) {

        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (password) === 'string', 'password must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error);
            return
        }

        var query = {
            sql: 'SELECT `ID`, `Voornaam`, `Achternaam`, `Email`, `Password` FROM `user` WHERE `Email` = ?',
            values: [req.body.email]
        }

        db.query(query, function (err, rows, fields) {
            if (err) {
                const error = new ApiError(err, 500)
                next(error)
            } else {
                if (rows && rows.length === 1 && rows[0].Email !== undefined) {
                    bcrypt.compare(req.body.password, rows[0].Password, (err, success) => {
                        if (success) {
                            console.log('Passwords did match, sending valid token')
                            const payload = {
                                user: rows[0].Email,
                                id: rows[0].ID
                            }
                            const userinfo = {
                                token: auth.encodeToken(payload),
                                username: rows[0].Voornaam + ' ' + rows[0].Achternaam,
                                email: rows[0].Email
                            }
                            res.status(200).json(userinfo).end()
                        } else {
                            next(new ApiError('Password did not match.', 401))
                        }
                    })
                } else {
                    next(new ApiError('Email does not exist.', 401))
                }
            }
        })

    },

    /**
     * Register user
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    register(req, res, next) {

        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string')
            assert(req.body.firstname.trim().length > 2, 'firstname must be at least 3 characters.')
            assert(req.body.lastname.trim().length > 2, 'lastname must be at least 3 characters')
            assert(validateEmail(req.body.email.trim()), 'email must be a valid emailaddress')
            assert(req.body.password.trim().length > 2, 'password must be at least 3 charaters')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }

        var query = {
            sql: 'SELECT `Email` FROM `user` WHERE `Email` = ?',
            values: [req.body.email]
        }

        db.query(query, function (err, rows, fields) {
            if (err) {
                const error = new ApiError(err, 412)
                next(error)
            } else {
                if (rows.length > 0) {
                    const error = new ApiError('Email already exists.', 412)
                    next(error)
                } else {
                    try {
                        const user = new User(
                            req.body.firstname,
                            req.body.lastname,
                            req.body.email,
                            req.body.password
                        )
                        console.log(user)

                        var query = {
                            sql: 'INSERT INTO `user` (`Voornaam`, `Achternaam`, `Email`, `Password`) VALUES (?, ?, ?, ?)',
                            values: [user.name.firstname, user.name.lastname, user.email, user.password]
                        }

                        db.query(query, function (err, rows, fields) {
                                if (err) {
                                    const error = new ApiError(err, 412)
                                    next(error)
                                } else {
                                    const payload = {
                                        user: user.email,
                                        id: rows.insertId
                                    }
                                    const userinfo = {
                                        token: auth.encodeToken(payload),
                                        username: user.name.firstname + ' ' + user.name.lastname,
                                        email: user.email
                                    }
                                    res.status(200).json(userinfo).end()
                                }
                            })
                    } catch (ex) {
                        next(ex)
                    }
                }
            }
        })


    }


}