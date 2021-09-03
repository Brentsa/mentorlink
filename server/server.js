const express = require('express');
const db = require('./database/connection');
const {ApolloServer} = require('apollo-server-express');
const {ApolloServerPluginDrainHttpServer} = require('apollo-server-core');
const http = require('http');
const {typeDefs, resolvers} = require('./schemas');

async function runApolloServer(typeDefs, resolvers){
    const app = express();
    const PORT = process.env.PORT || 3000;
    const httpServer = http.createServer(app);
    const server = new ApolloServer({typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({httpServer})]})

    await server.start();
    server.applyMiddleware({app});

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    await db.on('connected', () => httpServer.listen(PORT, ()=> {
             console.log(`Server is conncected to the DB and is running on http://localhost:${PORT}`)
             console.log(`Access graphQL playground at http://localhost:${PORT}${server.graphqlPath}`);
    }))
}

runApolloServer(typeDefs, resolvers);