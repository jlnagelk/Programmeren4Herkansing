class Sharer {
    constructor(userId, categorieId, spullenId) {
        this.userId = userId
        this.categorieId = categorieId
        this.spullenId = spullenId
    }

    getUserID() {
        return this.userId
    }

    getCategoryID() {
        return this.categorieId
    }

    getStuffID() {
        return this.spullenId
    }
}

module.exports = Sharer