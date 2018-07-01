const ApiError = require('../model/ApiError')
const assert = require('assert')

module.exports = {

        /**
         * Get all stuff
         * 
         * @param {*} req The incoming request.
         * @param {*} res The newly created person.
         * @param {*} next ApiError when id is invalid.
         */
        getAll(req, res, next) {
            try {
                const query = {
                    sql: "SELECT * FROM `spullen` WHERE categorieID = ?",
                    values: [req.params.IDCategory]
                };
                db.query(query,
                    (err, rows, fields) => {
                        if (err) {
                            const error = new ApiError(err, 412);
                            next(error);
                        }
                        if (rows.length === 0) {
                            const error = new ApiError('Non-existing categories or not allowed to access it.', 404);
                            next(error);
                        } else {
                            res.status(200).json(rows).end();
                        }
                    }
                );
            } catch (ex) {
                const error = new ApiError(ex, 412);
                next(error);
            }
        },

        /**
         * Get with id
         * 
         * @param {*} req The incoming request.
         * @param {*} res The newly created person.
         * @param {*} next ApiError when id is invalid.
         */
        getStuffByID(req, res, next) {
            try {
                const query = {
                    sql: "SELECT * FROM `spullen` WHERE categorieID = ? AND ID = ?",
                    values: [req.params.IDCategory, req.params.IDStuff]
                };
                db.query(query,
                    (err, rows, fields) => {
                        if (err) {
                            const error = new ApiError(err, 412);
                            next(error);
                        }
                        if (rows.length === 0) {
                            const error = new ApiError('Non-existing categories or not allowed to access it.', 404);
                            next(error);
                        } else {
                            res.status(200).json(rows).end();
                        }
                    }
                );
            } catch (ex) {
                const error = new ApiError(ex, 412);
                next(error);
            }
        },

        /**
         * Create stuff
         * 
         * @param {*} req The incoming request.
         * @param {*} res The newly created person.
         * @param {*} next ApiError when id is invalid.
         */

        postStuff(req, res, next) {
            const userID = 1;
            try {
                assert(typeof (req.body.naam) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.beschrijving) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.merk) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.soort) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.bouwjaar) === 'number', 'One or more properties in the request body are missing or incorrect')
            } catch (ex) {
                const error = new ApiError(ex.toString(), 412)
                next(error)
                return
            }

            try {
                const query = {
                    sql: "INSERT INTO spullen (Naam, Beschrijving, Merk, Soort, Bouwjaar, UserID, categorieID) VALUES (?,?,?,?,?,?,?)",
                    values: [req.body.naam, req.body.beschrijving, req.body.merk, req.body.soort, req.body.bouwjaar, userID, req.params.IDCategory]
                };
                db.query(query,
                    (err, rows, fields) => {
                        if (err) {
                            const error = new ApiError(err, 412);
                            next(error);
                        }
                        if (rows.length === 0) {
                            const error = new ApiError('Non-existing categories or not allowed to access it.', 404);
                            next(error);
                        } else {
                            res.status(200).json(rows).end();
                        }
                    }
                );
            } catch (ex) {
                const error = new ApiError(ex, 412);
                next(error);
            }
        },

        /**
         * Put stuff
         * 
         * @param {*} req The incoming request.
         * @param {*} res The newly created person.
         * @param {*} next ApiError when id is invalid.
         */
        editStuffByID(req, res, next) {
            userID = 1;

            try {
                assert(typeof (req.body.naam) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.beschrijving) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.merk) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.soort) === 'string', 'One or more properties in the request body are missing or incorrect')
                assert(typeof (req.body.bouwjaar) === 'number', 'One or more properties in the request body are missing or incorrect')
            } catch (ex) {
                const error = new ApiError(ex.toString(), 412)
                next(error)
                return
            }
            try {
                const query = {
                    sql: "SELECT * FROM `spullen` WHERE categorieID = ? AND ID = ?",
                    values: [req.params.IDCategory, req.params.IDStuff]
                };
                db.query(query,
                    (err, rows, fields) => {
                        if (err) {
                            const error = new ApiError(err, 412);
                            next(error);
                        }
                        if (rows.length === 0) {
                            const error = new ApiError('Non-existing categories or not allowed to access it.', 404);
                            next(error);
                        } else if (rows[0].UserID != userID) {
                            const error = new ApiError('Non-existing categories or not allowed to access it.', 404);
                            next(error);
                        } else {
                            try {
                                const query = {
                                    sql: "UPDATE spullen SET `Naam` = ?, `Beschrijving` = ?, `Merk` = ?, `Soort` = ?, `Bouwjaar`= ? WHERE ID = ?",
                                    values: [req.body.naam, req.body.beschrijving, req.body.merk, req.body.soort, req.body.bouwjaar, req.params.IDCategory]
                                };
                                db.query(query,
                                    (err, rows, fields) => {
                                        if (err) {
                                            const error = new ApiError(err, 412);
                                            next(error);
                                        }
                                        if (rows.length === 0) {
                                            const error = new ApiError('Non-existing or not allowed to access it.', 404);
                                            next(error);
                                        } else {
                                            res.status(200).json(rows).end();
                                        }
                                    }
                                );
                            } catch (ex) {
                                const error = new ApiError(ex, 412);
                                next(error);
                            }
                        }
                    }
                );
            } catch (ex) {
                const error = new ApiError(ex, 412);
                next(error);
            }
        },

        /**
         * Delete stuff
         * 
         * @param {*} req The incoming request.
         * @param {*} res The newly created person.
         * @param {*} next ApiError when id is invalid.
         */
        deleteStuffByID(req, res, next) {
            userID = 1;

            try {
                const query = {
                    sql: "SELECT * FROM `spullen` WHERE categorieID = ? AND ID = ?",
                    values: [req.params.IDCategory, req.params.IDStuff]
                };
                db.query(query,
                    (err, rows, fields) => {
                        if (err) {
                            const error = new ApiError(err, 412);
                            next(error);
                        }
                        if (rows.length === 0) {
                            const error = new ApiError('Non-existing stuff or not allowed to access it.', 404);
                            next(error);
                        } else if (rows[0].UserID != userID) {
                            const error = new ApiError('Non-existing stuff or not allowed to access it.', 404);
                            next(error);
                        } else {
                            try {
                                const query = {
                                    sql: "DELETE FROM `spullen` WHERE ID =?",
                                    values: [req.params.IDStuff]
                                };
                                db.query(query,
                                    (err, rows, fields) => {
                                        if (err) {
                                            const error = new ApiError(err, 412);
                                            next(error);
                                        }
                                        if (rows.length === 0) {
                                            const error = new ApiError('Non-existing or not allowed to access it.', 404);
                                            next(error);
                                        } else {
                                            res.status(200).json(rows).end();
                                        }
                                    }
                                );
                            } catch (ex) {
                                const error = new ApiError(ex, 412);
                                next(error);
                            }
                        }
                    }
                );
            } catch (ex) {
                const error = new ApiError(ex, 412);
                next(error);
            }
        }
    }