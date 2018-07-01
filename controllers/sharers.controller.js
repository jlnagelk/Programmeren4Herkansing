const ApiError = require('../model/ApiError')
const assert = require('assert')
const db = require('../config/db')

module.exports = {
    /**
     * Get sharers
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    getSharers(req, res, next) {
        try {
            const query = {
                sql: "SELECT * FROM view_delers WHERE categorieID = ? AND spullenID = ?",
                values: [req.params.IDCategory, req.params.IDStuff]
            };
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error);
                    }
                    if (rows.length === 0) {
                        const error = new ApiError('Non-existing category or stuff or not allowed to access it.', 404);
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
     * Create sharer
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    createSharer(req, res, next) {

        try {
            const query = {
                sql: "SELECT * FROM spullen WHERE categorieID = ? AND ID = ?",
                values: [req.params.IDCategory, req.params.IDStuff]
            };
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error);
                    }
                    if (rows.length === 0) {
                        const error = new ApiError('Non-existing category or stuff or not allowed to access it.', 404);
                        next(error)
                    } else {
                        const query = {
                            sql: "SELECT * FROM delers WHERE categorieID = ? AND spullenID = ? AND UserID = ?",
                            values: [req.params.IDCategory, req.params.IDStuff, req.user.id]
                        }

                        db.query(query,
                            (err, rows, fields) => {
                                if (err) {
                                    const error = new ApiError(err, 412);
                                    next(error);
                                }
                                if (rows.length > 0) {
                                    const error = new ApiError('User already signed up')
                                    next(error)
                                } else {
                                    const query = {
                                        sql: "INSERT INTO delers (`UserID`, `categorieID`, `spullenID`) VALUES (?,?,?)",
                                        values: [req.user.id, req.params.IDCategory, req.params.IDStuff]
                                    }
                                    db.query(query,
                                        (err, rows, fields) => {
                                            if (err) {
                                                const error = new ApiError(err, 412)
                                                next(error)
                                            } else {
                                                const query = {
                                                    sql: "SELECT `Voornaam`, `Achternaam`, `Email` FROM user WHERE ID = ?",
                                                    values: [req.user.id]
                                                }
                                                db.query(query,
                                                    (err, rows, fields) => {
                                                        if (err) {
                                                            const error = new ApiError(err, 412);
                                                            next(error);
                                                        } else {
                                                            res.status(200).json(rows).end();
                                                        }
                                                    })
                                            }
                                        })
                                }
                            })

                    }
                }
            );
        } catch (ex) {
            const error = new ApiError(ex, 412);
            next(error);
        }
    },

    /**
     * Delete sharer
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    deleteSharer(req, res, next) {
        try {
            const query = {
                sql: "SELECT * FROM spullen WHERE categorieID = ? AND ID = ?",
                values: [req.params.IDCategory, req.params.IDStuff]
            };
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error);
                    }
                    if (rows.length === 0) {
                        const error = new ApiError('Non-existing category or stuff or not allowed to access it.', 404);
                        next(error)
                    } else {
                        const query = {
                            sql: "SELECT * FROM delers WHERE categorieID = ? AND spullenID = ? AND UserID = ?",
                            values: [req.params.IDCategory, req.params.IDStuff, req.user.id]
                        }

                        db.query(query,
                            (err, rows, fields) => {
                                if (err) {
                                    const error = new ApiError(err, 412);
                                    next(error);
                                }
                                if (rows.length === 0) {
                                    const error = new ApiError('User did not signed up')
                                    next(error)
                                } else {
                                    const query = {
                                        sql: "DELETE FROM delers WHERE `UserID` = ? AND categorieID = ? AND spullenID = ?",
                                        values: [req.user.id, req.params.IDCategory, req.params.IDStuff]
                                    }
                                    db.query(query,
                                        (err, rows, fields) => {
                                            if (err) {
                                                const error = new ApiError(err, 412)
                                                next(error)
                                            } else{
                                                res.status(200).end()
                                            }
                                        })


                                }
                            })

                    }
                }
            );
        } catch (ex) {
            const error = new ApiError(ex, 412);
            next(error);
        }
    },

}