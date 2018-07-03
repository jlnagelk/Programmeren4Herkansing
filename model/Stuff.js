const assert = require('assert')
const ApiError = require('../model/ApiError')

class Stuff {
    constructor(naam, beschrijving, merk, soort, bouwjaar) {
        try{
            assert(typeof (naam) === 'string', 'Naam must be a string')
            assert(typeof (beschrijving) === 'string', 'Beschrijving must be a string')
            assert(typeof (merk) === 'string', 'Merk must be a string')
            assert(typeof (soort) === 'string', 'Soort must be a string')
            assert(typeof (bouwjaar) === 'number', 'Bouwjaar must be a number')
        } catch (ex){
            throw(new ApiError(ex.toString(), 412))
        }

        this.naam = naam
        this.beschrijving = beschrijving
        this.merk = merk
        this.soort = soort
        this.bouwjaar = bouwjaar
    }

    getName() {
        return this.naam
    }

    getDescription(){
        return this.beschrijving
    }

    getBrand(){
        return this.merk
    }

    getKind() {
        return this.soort
    }

    getYear() {
        return this.bouwjaar
    }
}

module.exports = Stuff