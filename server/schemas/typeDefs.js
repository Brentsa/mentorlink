const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Hello{
        value: String
    }

    type Query{
        hello(name: String): Hello
    }
`
module.exports = typeDefs;