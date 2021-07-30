const fetch = require('node-fetch')
const User = require('./User')
const SearchResult = require('./SearchResult')

class UserManager {
    constructor(client) {
        this.client = client;
    }

    async get(id) {
        let data = await fetch(`https://users.roblox.com/v1/users/${id}`)
        data = await data.json()
        return new User(this.client, data);
    }

    async search(query, options={}) {
        let uri = `https://users.roblox.com/v1/users/search?keyword=${query}&limit=10`;
        if (options.pageCursor) uri+=`&cursor=${options.pageCursor}`;
        let data = await fetch(uri)
        data = await data.json()
        let results = []
        for(const user of data.data) {
            results.push(await this.get(user.id))
        }
        return new SearchResult(this.client, 'user', results, query, data.previousPageCursor, data.nextPageCursor);
    }
}

module.exports = UserManager;