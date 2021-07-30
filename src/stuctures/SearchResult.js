class SearchResult {
    constructor(client, type, result, query, previousPageCursor, nextPageCursor) {
        this.client = client;
        this.type = type;
        this.query = query;
        this.previousPageCursor = previousPageCursor;
        this.nextPageCursor = nextPageCursor;
        this.page = 1;
        switch (type) {
            case 'user':
                this.users = result;
        }
    }

    async nextPage() {
        this.page+=1;
        const res = await this.client.users.search(this.query, {pageCursor: this.nextPageCursor});
        this.users = res.users;
    }

    async previousPage() {
        let res;
        if (this.page > 2) {
            res = await this.client.users.search(this.query, {pageCursor: this.previousPageCursor});
        } else if(this.page == 2) {
            res = await this.client.users.search(this.query);
        } else {
            throw "Already viewing page 1";
        }
        this.page-=1;
        this.users = res.users;
    }
}

module.exports = SearchResult;