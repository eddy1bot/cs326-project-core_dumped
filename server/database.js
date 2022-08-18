import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export class Database {
    constructor(dburl) {
        this.dburl = dburl;
    }


    async connect() {
        this.pool = new Pool({
            connectionString : this.dburl,
            ssl : { rejectUnauthorized : false },
        });

        //this creates a pool
        this.client = await this.pool.connect();

        //this initalizes the database
        await this.init();
    }

    //function to initalize database by creating tables
    async init() {
        const queryText = `
        create table if not exists expenseLedger (
            title varchar(30) primary key,
            amt integer,
            freq varchar(30)
        );

        create table if not exists transactionLedger (
            amt integer primary key,
            des varchar(30)
        );
        `;
        const res = await this.client.query(queryText);
    }

    //kill the connection to the database
    async close() {
        this.client.release();
        await this.pool.end();
    }



    /** Saves to the database an expense (single row entry)
     *
     * @param {string} title the title of the expense
     * @param {integer} amt amount of the expense
     * @param {string} freq frequency of the expense
     */
    async saveExpense(title, amt, freq) {
        const queryText =
            'INSERT INTO expenseLedger (title, amt, freq)' +
                'VALUES ($1, $2, $3) RETURNING *';
        try {
            const response = this.client.query(queryText, [title, amt, freq]);
        } catch (error) {
            console.log("Something broke, the error is....");
            console.log(error);
        }
    }

    /** Saves to the database a single transaction (single row entry)
     *
     * @param {integer} amt the amount of the transaction
     * @param {*} des description of the transaction
     */
    async saveTransaction(amt, des) {
        const queryText =
            'INSERT INTO transactionLedger (amt, des)' +
                'VALUES ($1, $2) RETURNING *';
        try {
            const response = this.client.query(queryText, [amt, des]);
        } catch (error) {
            console.log("Something broke, the error is....");
            console.log(error);
        }
    }

    /** Returns the expense log (array)
     *
     * @returns an array of all expenses which have been saved
     */
    async getExpenseLedger() {
        let final = [];

        const queryText =
            'SELECT * FROM expenseLedger';
        const response = await this.client.query(queryText);

        for (let i = 0; i < response.rowCount; i++) {
            let title = response.rows[i].title;
            let amt = response.rows[i].amt;
            let freq = response.rows[i].freq;
            let entry = {title: title, amt: amt, freq: freq};
            final.push(entry);
        }
        return final;
    }

    /** Gets the transaction log (array)
     *
     * @returns an array of all transactions which have been saved
     */
    async getTransactionLedger() {
        let final = [];

        const queryText =
            'SELECT * FROM transactionLedger';
        const response = await this.client.query(queryText);

        for (let i = 0; i < response.rowCount; i++) {
            let amt = response.rows[i].amt;
            let des = response.rows[i].des;
            let entry = {amt: amt, des: des};
            final.push(entry);
        }
        return final;
    }

    /** Deletes and expense from the database
     *
     * @param {string} title the title of the expense to delete
     * @param {integer} amt the amount of the expense to delete
     * @param {string} freq the frequency of the expense to delete
     */
    async deleteExpense(title, amt, freq) {
        const queryText =
            'DELETE FROM transactionLedger WHERE title = $1 AND amt = $2' +
            ' AND freq = $3';
        try {
            const response = this.client.query(queryText, [title, amt, freq]);
        } catch (error) {
            console.log("Something broke, the error is....");
            console.log(error);
        }
    }

    /** Deletes a transaction from the database
     *
     * @param {integer} amt the amount of the transaction to delete
     * @param {*} des the description of hte transaction to delete
     */
    async deleteTransaction(amt, des) {
        const queryText =
            'DELETE FROM transactionLedger WHERE amt = $1 AND des = $2';
        try {
            const response = this.client.query(queryText, [amt, des]);
        } catch (error) {
            console.log("Something broke, the error is....");
            console.log(error);
        }
    }
}