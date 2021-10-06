const express = require('express');
const db = require('./database/connection');
const {ApolloServer} = require('apollo-server-express');
const {ApolloServerPluginDrainHttpServer} = require('apollo-server-core');
const http = require('http');
const {typeDefs, resolvers} = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const path = require('path');

async function runApolloServer(typeDefs, resolvers){
    const app = express();
    const PORT = process.env.PORT || 3001;
    const httpServer = http.createServer(app);
    const server = new ApolloServer({typeDefs, resolvers, context: authMiddleware, plugins: [ApolloServerPluginDrainHttpServer({httpServer})]})

    await server.start();
    server.applyMiddleware({app});

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    db.once('open', () => httpServer.listen(PORT, ()=> {
        console.log(`Server is conncected to the DB and is running on http://localhost:${PORT}`)
        console.log(`Access graphQL playground at http://localhost:${PORT}${server.graphqlPath}`);
    }))
}

runApolloServer(typeDefs, resolvers);
