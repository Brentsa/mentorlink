const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Industry{
        _id: ID
        name: String!
    }

    type Message{
        _id: ID
        creator: Member!
        text: String!
        createdAt: String
        read: Boolean
    }

    type MentorGroup{
        _id: ID
        numMentees: Int
        mentees: [Member]
        industry: Industry
        conversation: [Message]
    }

    type ContactInfo{
        _id: ID
        phoneNumber: String
        email: String
        streetNumber: String
        streetName: String
        suiteNumber: String
        city: String
        province: String
        country: String
        postalCode: String
    }

    type Member{
        _id: ID
        firstName: String!
        lastName: String!
        username: String!
        password: String!
        description: String
        profilePicture: String
        industry: Industry
        mentorGroup: MentorGroup
        contactInfo: ContactInfo
    }

    input minMemberContent{
        firstName: String
        lastName: String
        username: String
        password: String
        description: String
        profilePicture: String
    }

    type Query{
        industries: [Industry]
        industry(_id: ID!): Industry
        members: [Member]
        member(_id: ID!): Member
    }

    type Mutation{
        addIndustry(name: String!): Industry
        deleteIndustry(_id: ID!): Industry
        addMember(member: minMemberContent!): Member
        updateMember(_id: ID!, member: minMemberContent!): Member
        deleteMember(_id: ID!): Member
    }
`
module.exports = typeDefs;