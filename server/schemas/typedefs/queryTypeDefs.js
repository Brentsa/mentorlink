const typeDef = `
    type Query{
        industries: [Industry]
        industry(_id: ID!): Industry
        members: [Member]
        member(username: String!): Member
        mentorGroups: [MentorGroup]
        mentorGroup(_id: ID!): MentorGroup
    }
`

module.exports = typeDef