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

    //REDO THIS TO USE THE CORRECT TABLE SETUP!!!
    //function to initalize database by creating tables
    async init() {
        const queryText = `
        create table if not exists words (
            name varchar(30) primary key,
            word varchar(30),
            score integer
        );

        create table if not exists game (
            name varchar(30) primary key,
            score integer
        );
        `;
        const res = await this.client.query(queryText);
    }

    //kill the connection to the database
    async close() {
        this.client.release();
        await this.pool.end();
    }



    //INSERT DB OPERATIONS WITH SQL QUERIES HERE!!!

}