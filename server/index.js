import { Database } from './database.js';

//importing express for server and dev logger from morgan
import express from "express";
import logger from "morgan";

class Server {
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

        /**
         * Route for saving an expense to database
         * Returns a json object indicating success
         */
        self.app.post('/logExpense', async (request, response) => {
            try {
                const {title, amt, freq} = request.body;
                await self.database.saveExpense(title, amt, freq);
                response.status(200).json({ "status" : "success" });
            } catch (error) {
                console.log("Logging expense failed, error is...");
                console.log(error);
                response.status(500).send(error);
            }
        });


        /**
         * Route for saving a transaction to database
         * Returns a json object indicating success
         */
        self.app.post('/logTransaction', async (request, response) => {
            try {
                const {amt, des} = request.body;
                await self.database.saveTransaction(amt, des);
                response.status(200).json({ "status" : "success" });
            } catch (error) {
                console.log("Logging transaction failed, error is...");
                console.log(error);
                response.status(500).send(error);
            }
        });

        /**
         * Route for getting the expense ledger/log
         * Returns json, an array of all expense objects
         */
        self.app.get('/getExpenseLog', async (request, response) => {
            try {
                const dataArray = await self.database.getExpenseLedger();
                response.status(200).json(dataArray);
            } catch (error) {
                console.log("Expense log retrieval failed, error is...");
                console.log(error);
                response.status(500).send(error);
            }
        });

        /**
         * Route for getting the transaction ledger/log
         * Returns json, an array of all transaction objects
         */
        self.app.get('/getTransactionLog', async (request, response) => {
            try {
                const dataArray = await self.database.getTransactionLedger();
                response.status(200).json(dataArray);
            } catch (error) {
                console.log("Transaction log retrieval failed, error is...");
                console.log(error);
                response.status(500).send(error);
            }
        });

        //route to respond to bad requests
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