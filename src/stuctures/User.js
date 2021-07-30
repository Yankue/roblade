class User {
    constructor(client, userData) {
        this.client = client;
        this.id = userData.id;
        this.name = userData.name;
        this.displayName = userData.displayName;
    }
}

module.exports = User