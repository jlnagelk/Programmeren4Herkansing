class CategoryResponse {
    constructor(ID, naam, beschrijving, beheerder, email) {
        this.ID = ID
        this.naam = naam
        this.beschrijving = beschrijving
        this.beheerder = beheerder
        this.email = email
    }

    getResponse() {
        let response = {
            ID: this.ID,
            Naam: this.naam,
            Beschrijving: this.beschrijving,
            Beheerder: this.beheerder,
            Email: this.email
        }
        return response
    }
}
 
module.exports = CategoryResponse