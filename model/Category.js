const assert = require('assert')
const ApiError = require('../model/ApiError')

class Category {
    constructor(naam, beschrijving) {
        try {
            assert(typeof(naam) === 'string', "Naam must be a string")
            assert(typeof(beschrijving) === 'string', "Beschrijving must be a string")
        } catch (ex) {
            throw(new ApiError(ex.toString(), 412))
        }

        this.naam = naam
        this.beschrijving = beschrijving
    }

    getName() {
        return this.naam
    }

    getDescription() {
        return this.beschrijving
    }
}

module.exports = Category