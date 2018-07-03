const ApiError = require('../model/ApiError')
const assert = require('assert')
const db = require('../config/db')
let Category = require('../model/Category')
const CategoryResponse = require('../model/CategoryResponse')
let category

module.exports = {

    //getting all existing categories
    //works when the token system is in place correctly

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
                sql: "SELECT * FROM view_categorie"
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
        category = new Category(req.body.naam, req.body.beschrijving)

        try {

            const query = {
                sql: "SELECT * FROM `categorie` WHERE `Naam` = ?",
                values: [category.getName()]
            }
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error)
                    } else if (rows.length > 0) {
                        const error = new ApiError("De naam van de categorie bestaat al", 409)
                        next(error)
                    } else {


                        const query = {
                            sql: "INSERT INTO categorie (`Naam`, `Beschrijving`, `UserID`) VALUES (?,?,?)",
                            values: [category.getName(), category.getDescription(), req.user.id]
                        };
                        db.query(query,
                            (err, rows, fields) => {
                                if (err) {
                                    const error = new ApiError(err, 412);
                                    next(error);
                                } else {
                                    const query = {
                                        sql: "SELECT * FROM `view_categorie` WHERE Naam = ?",
                                        values: [category.getName()]
                                    }

                                    db.query(query,
                                        (err, rows, fields) => {
                                            if (err) {
                                                const error = new ApiError(err, 412);
                                            } else {
                                                let categoryResponse = new CategoryResponse(rows[0].ID, rows[0].Naam, rows[0].Beschrijving, rows[0].Beheerder, rows[0].Email)
                                                res.status(200).json(categoryResponse).end()
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
     * Get category by id
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    deleteCategoryByID(req, res, next) {

        //validating if user is actually the one who is able to alter this category
        try {
            const query = {
                sql: "SELECT UserID FROM categorie WHERE ID =?",
                values: [req.params.IDCategory]
            };
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error);
                    } else if (rows.length === 0) {
                        const error = new ApiError('Non-existing category.', 404);
                        next(error);
                    }
                    //if the UserID from the database is not the same as the userID the token contains, a user doesn't have access to this feature. 
                    else if (rows[0].UserID != req.user.id) {
                        const error = new ApiError('Not allowed to access it.', 409);
                        next(error);
                    }
                    //userID is valid and data can be deleted 
                    else {

                        const query = {
                            sql: "DELETE FROM categorie WHERE `ID` = ?",
                            values: [req.params.IDCategory]
                        };
                        db.query(query,
                            (err, rows, fields) => {
                                if (err) {
                                    const error = new ApiError(err, 412);
                                    next(error);
                                } else {


                                    res.status(200).end()
                                }

                            })
                    }
                })

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
        category = new Category(req.body.naam, req.body.beschrijving)

        try {
            const query = {
                sql: "SELECT UserID FROM Categorie WHERE ID =?",
                values: [req.params.IDCategory]
            };
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error);
                    }
                    if (rows.length === 0) {
                        const error = new ApiError('Non-existing category.', 404);
                        next(error);
                    }
                    //if the UserID from the database is not the same as the userID the token contains, a user doesn't have access to this feature. 
                    else if (rows[0].UserID != req.user.id) {
                        const error = new ApiError('Not allowed to access it.', 409);
                        next(error);
                    }
                    //userID is valid and data can be edited
                    else {
                        try {

                            const query = {
                                sql: "SELECT * FROM `categorie` WHERE `Naam` = ?",
                                values: [category.getName()]
                            }
                            db.query(query,
                                (err, rows, fields) => {
                                    if (err) {
                                        const error = new ApiError(err, 412);
                                        next(error)
                                    } else if (rows.length > 0) {
                                        const error = new ApiError("De naam van de categorie bestaat al", 409)
                                        next(error)
                                    } else {

                                        const query = {
                                            sql: "UPDATE categorie SET `Naam` = ?, `Beschrijving` = ? WHERE ID = ?",
                                            values: [category.getName(), category.getDescription(), req.params.IDCategory]
                                        };
                                        db.query(query,
                                            (err, rows, fields) => {
                                                if (err) {
                                                    const error = new ApiError(err, 412);
                                                    next(error);
                                                } else {
                                                    const query = {
                                                        sql: "SELECT * FROM `view_categorie` WHERE ID = ?",
                                                        values: [req.params.IDCategory]
                                                    }

                                                    db.query(query,
                                                        (err, rows, fields) => {
                                                            if (err) {
                                                                const error = new ApiError(err, 412);
                                                            } else {
                                                                res.status(200).json(rows).end();
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
    getCategoryByID(req, res, next) {
        try {
            const query = {
                sql: "SELECT * FROM view_categorie WHERE ID=?",
                values: req.params.IDCategory
            };
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412);
                        next(error);
                    }
                    if (rows.length === 0) {
                        const error = new ApiError('Non-existing category.', 404);
                        next(error);
                    } else {
                        let categoryResponse = new CategoryResponse(rows[0].ID, rows[0].Naam, rows[0].Beschrijving, rows[0].Beheerder, rows[0].Email)
                        res.status(200).json(categoryResponse).end()
                    }
                }
            );
        } catch (ex) {
            const error = new ApiError(ex, 412);
            next(error);
        }
    }
}