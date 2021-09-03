const express = require('express');
const db = require('./database/connection');
const {ApolloServer} = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schemas');

async function runApolloServer(typeDefs, resolvers){
    const app = express();
    const PORT = process.env.PORT || 3000;
    const server = new ApolloServer({typeDefs, resolvers})

    await server.start();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    server.applyMiddleware({app});

    await db.on('connected', () => app.listen(PORT, ()=> {
             console.log(`Server is conncected to the DB and is running on http://localhost:${PORT}`)
             console.log(`Access graphQL playground at http://localhost:${PORT}${server.graphqlPath}`);
    }))

    return {server, app}
}

runApolloServer(typeDefs, resolvers);