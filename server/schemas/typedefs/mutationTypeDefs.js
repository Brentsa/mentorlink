const typeDef = `
    type Mutation{
        addIndustry(name: String!): Industry
        deleteIndustry(_id: ID!): Industry
        addIndustryToMember(memberId: ID!, industryId: ID!): Member
        addMember(member: minMemberContent!): AuthMember
        loginMember(username: String!, password: String!): AuthMember
        updateMember(_id: ID!, member: minMemberContent!): Member
        deleteMember(_id: ID!): Member
        addContactInfo(_id: ID!, contactInfo: contactInfoContent!): Member
        deleteContactInfo(_id: ID!): Member
        addMentorGroup(mentorId: ID!, numMentees: Int!, industryId: ID!): MemberAndMentorGroup
        deleteMentorGroup(groupId: ID!): MemberAndMentorGroup
        addMenteeToGroup(groupId: ID!, menteeId: ID!): MentorGroup
        removeMenteeFromGroup(groupId: ID!, menteeId: ID!): MentorGroup
        updateNumberOfMentees(groupId: ID!, numMentees: Int!): MentorGroup
        addMessage(groupId: ID!, content: messageContent!): MentorGroup
        readMessage(groupId: ID!, messageId: ID!): MentorGroup
        deleteMessage(groupId: ID!, messageId: ID!): MentorGroup
    }
`

module.exports = typeDef