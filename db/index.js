'use strict';

const {MongoClient} = require('mongodb');

const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_NAME,
} = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`;

let connection;

async function connectDB () {
    if (connection) return connection

    let client;

    try {
        client = await MongoClient.connect(mongoUrl,{
            useNewUrlParser: true,
        })
        connection = client.db(DB_NAME);
        console.log("Mongodb connected");
    } catch (error) {
        console.log('Could ot connect to db', mongoUrl,error);
        process.exit(1);
    }

    return connection;
}

module.exports = connectDB;