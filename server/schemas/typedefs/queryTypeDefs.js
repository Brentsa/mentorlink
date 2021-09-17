const typeDef = `
    type Query{
        industries: [Industry]
        industry(_id: ID!): Industry
        members: [Member]
        member(_id: ID!): Member
        mentorGroups: [MentorGroup]
        mentorGroup(_id: ID!): MentorGroup
    }
`

module.exports = typeDef