'use strict'

require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./graphql/schema');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());

app.get('/',(req, res) => {
    res.send("Welcome to my graphql api");
})

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`);
})