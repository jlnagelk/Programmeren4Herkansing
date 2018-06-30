const ApiError = require('../model/ApiError')
const assert = require('assert')
//const db = require('../config/db')

module.exports = {

    //getting all existing categories
    //not working because there is no working database in place

    /**
     * Get all categories
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    getAllCategories(req, res, next) {
        try {
            const query = {
                sql: ""
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
     * Add category
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    addCategory(req, res, next) {
        try {
            assert(typeof (req.body.naam) === 'string', 'One or more properties in the request body are missing or incorrect')
            assert(typeof (req.body.beschrijving) === 'string', 'One or more properties in the request body are missing or incorrect')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }
        try {
            const query = {
                sql: "",
                values: [req.body.naam, req.body.beschrijving]
            };
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error);
                    } else {
                        res.status(200).end();
                    }
                }
            );
        } catch (ex) {
            const error = new ApiError(ex, 412);
            next(error);
        }
    },

    /**
     * Get category by id
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    getCategoryByID(req, res, next) {
        try {
            const query = {
                sql: "",
                values: req.params.IDCategory
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
     * Edit category by id
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    editCategoryByID(req, res, next) {
        try {
            assert(typeof (req.body.naam) === 'string', 'One or more properties in the request body are missing or incorrect')
            assert(typeof (req.body.beschrijving) === 'string', 'One or more properties in the request body are missing or incorrect')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }
        try {
            const query = {
                sql: "",
                values: req.params.IDCategory
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
     * Delete category by id
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    deleteCategoryByID(req, res, next) {
        try {
            const query = {
                sql: "",
                values: req.params.IDCategory
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
    }
}