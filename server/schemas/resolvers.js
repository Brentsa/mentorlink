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
    updateMember, 
    deleteMember, 
    addContactInfo, 
    deleteContactInfo
} = require('./resolvers/memberResolvers');

const { 
    mentorGroups, 
    mentorGroup, 
    addMentorGroup, 
    deleteMentorGroup,
    addMenteeToGroup,
    removeMenteeFromGroup
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
        updateMember,
        deleteMember,
        addContactInfo,
        deleteContactInfo,
        addMentorGroup,
        deleteMentorGroup,
        addMenteeToGroup,
        removeMenteeFromGroup
    }
}

module.exports = resolvers;