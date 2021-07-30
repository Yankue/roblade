const roblox = require('./src/index')
const client = new roblox.Client()

const doit = async () => {
    const results = await client.users.search("Yankue")
}

doit()