import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export class Database {
    constructor(dburl) {
        this.dburl = dburl;
    }


    async connect() {
        this.pool = new Pool({
            connectionString: this.dburl,
            ssl: { rejectUnauthorized: false },
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
            title varchar(30),
            amt integer,
            freq varchar(30)
        );

        create table if not exists transactionLedger (
            amt integer,
            des varchar(30)
        );
        `;
        const res = await this.client.query(queryText);
    }

    //            ADD CONSTRAINT exp_pkey PRIMARY KEY (title, amt, freq);
    //ADD CONSTRAINT trans_pkey PRIMARY KEY (amt, des);

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
            'INSERT INTO expenseLedger (title, amt, freq) VALUES ($1, $2, $3) RETURNING *';
        try {
            const response = await this.client.query(queryText, [title, amt, freq]);
            console.log(response.rows);
            return response.rows;
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
            'INSERT INTO transactionLedger (amt, des) VALUES ($1, $2) RETURNING *';
        try {
            const response = await this.client.query(queryText, [amt, des]);
            return response.rows;
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

        const queryText = 'SELECT * FROM expenseLedger';
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

        const queryText = 'SELECT * FROM transactionLedger';
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
            'DELETE FROM expenseLedger WHERE title = $1 AND amt = $2 AND freq = $3 RETURNING *';
        try {
            const response = this.client.query(queryText, [title, amt, freq]);
            return response.rows
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
            'DELETE FROM transactionLedger WHERE amt = $1 AND des = $2 RETURNING *';
        try {
            const response = await this.client.query(queryText, [amt, des]);
            return response.rows;
        } catch (error) {
            console.log("Something broke, the error is....");
            console.log(error);
        }
    }

    // /** Returns true or false if user is in system
    //  *
    //  * @param {string} username the username of the person to check
    //  */
    // async findUser(username) {
    //     const queryText =
    //         'SELECT EXISTS(SELECT 1 FROM users WHERE name = $1);';
    //     try {
    //         const response = await this.client.query(queryText, [username]);
    //         console.log("im trying to figure out what is being returned below")
    //         console.log(response);
    //         console.log(response.rows);
    //     } catch (error) {
    //         console.log("something broke, error is...")
    //         console.log(error);
    //     }
    // }

    // /** Validates that a users entered password is the same as their saved one
    //  *
    //  * @param {string} name name of user
    //  * @param {*} password password of user
    //  * @returns true if user is in system and password provided matches saved
    //  */
    // async validatePassword(name, password) {
    //     const queryText =
    //         'SELECT * FROM users WHERE name = $1';

    //     if (!this.findUser(name)) {
    //         return false;
    //     }

    //     try {
    //         const response = await this.client.query(queryText, [name]);
    //         const entry = response.rows[0];

    //         if (entry.password != password) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // async createUser(name, password) {
    //     if (this.findUser(name)) {
    //         console.log("user already exists!!");
    //         return false;
    //     } else {
    //         try {
    //             queryText =
    //                 'INSERT INTO users (name, password) VALUES ($1, $2)';
    //             const response =
    //                 await this.client.query(queryText, [name, password]);
    //             return response.rows;
    //         } catch (error) {
    //             console.log(error);
    //         }

    //     }
    // }
}