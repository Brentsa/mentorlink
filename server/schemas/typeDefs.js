const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Industry{
        _id: ID
        name: String
    }

    type Query{
        industries: [Industry]
        industry(_id: ID!): Industry
    }

    type Mutation{
        addIndustry(name: String!): Industry
        deleteIndustry(_id: ID!): Industry
    }
`
module.exports = typeDefs;