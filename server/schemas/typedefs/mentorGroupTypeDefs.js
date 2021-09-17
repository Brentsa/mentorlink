const typeDef = `
    type Message{
        _id: ID
        creator: Member
        text: String
        createdAt: String
        read: Boolean
    }

    type MentorGroup{
        _id: ID
        mentor: Member
        numMentees: Int
        menteeCount: Int
        mentees: [Member]
        industry: Industry
        conversation: [Message]
        convoLength: Int
    }

    input messageContent{
        creator: ID!
        text: String!
        createdAt: String
        read: Boolean
    }
`

module.exports = typeDef