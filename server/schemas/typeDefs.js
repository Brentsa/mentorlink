const {gql} = require('apollo-server-express');

//import typd defs
const Industry = { typeDef } = require('./typedefs/industryTypeDefs') ;
const Member = { typeDef } = require('./typedefs/memberTypeDefs') ;
const MentorGroup = { typeDef } = require('./typedefs/mentorGroupTypeDefs') ;
const Query = { typeDef } = require('./typedefs/queryTypeDefs') ;
const Mutation = { typeDef } = require('./typedefs/mutationTypeDefs') ;

//combine imported typedefs in gql function
const typeDefs = gql`
    ${Industry}
    ${Member}
    ${MentorGroup}
    ${Query}
    ${Mutation}
`

module.exports = typeDefs;