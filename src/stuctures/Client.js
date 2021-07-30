const UserManager = require('./UserManager')

class Client {
    constructor(options={}) {
        this.authentication = {};
        this.users = new UserManager(this);
    }

    login() {

    }
}

module.exports = Client;