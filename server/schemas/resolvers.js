const { 
    industries, 
    industry, 
    addIndustry, 
    deleteIndustry 
} = require('./resolvers/industryResolvers');

const { 
    members, 
    member,
    addMember, 
    loginMember,
    updateMember, 
    deleteMember,
    addIndustryToMember, 
    addContactInfo, 
    deleteContactInfo
} = require('./resolvers/memberResolvers');

const { 
    mentorGroups, 
    mentorGroup, 
    addMentorGroup, 
    deleteMentorGroup,
    addMenteeToGroup,
    removeMenteeFromGroup,
    updateNumberOfMentees,
    addMessage,
    readMessage,
    deleteMessage
} = require('./resolvers/mentorGroupResolvers')

const resolvers = {
    Query: {
        industry,
        industries, 
        members,
        member,
        mentorGroup,
        mentorGroups
    },
    Mutation:{
        addIndustry,
        deleteIndustry,
        addMember,
        loginMember,
        updateMember,
        deleteMember,
        addIndustryToMember,
        addContactInfo,
        deleteContactInfo,
        addMentorGroup,
        deleteMentorGroup,
        addMenteeToGroup,
        removeMenteeFromGroup,
        updateNumberOfMentees,
        addMessage,
        readMessage,
        deleteMessage
    }
}

module.exports = resolvers;