import { Database } from './database.js';

//importing express for server and dev logger from morgan
import express from "express";
import logger from "morgan";

class theServer {
    constructor(dburl) {
        this.dburl = dburl;
        this.app = express();
        this.app.use('/', express.static("client"));
        this.app.use(express.urlencoded({ extended : false}));
        this.app.use(logger('dev'));
        this.app.use(express.json());
    }

    async initRoutes() {
        const self = this;

        //INSERT THE ROUTES HERE

        self.app.all('*', async (request, response) => {
            response.status(404).send(`
                Im so sorry but the path ${request.path} was not found`);
        });
    }

    async initDatabase() {
        this.database = new Database(this.dburl);
        await this.database.connect();
    }

    async start() {
        await this.initRoutes();
        await this.initDatabase();
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Ready to rock and roll on port ${port}!`);
        })
    }
}

const server = new Server(process.env.DATABASE_URL);
server.start();