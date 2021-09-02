const express = require('express');
const db = require('./database/connection');
const {ApolloServer} = require('apollo-server-express');

async function runApolloServer(){
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get('/', (req, res) => res.send('Hello World'))

    db.on('connected', () => {
        app.listen(PORT, ()=> console.log(`Server is conncected to the DB and is running on http://localhost:${PORT}`));
    })
}

runApolloServer();