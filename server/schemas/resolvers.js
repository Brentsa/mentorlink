const { industries, industry, addIndustry, deleteIndustry } = require('./resolvers/industryResolvers');
const { members, member, addMember, updateMember, deleteMember, addContactInfo, deleteContactInfo} = require('./resolvers/memberResolvers');

const resolvers = {
    Query: {
        industry,
        industries, 
        members,
        member
    },
    Mutation:{
        addIndustry,
        deleteIndustry,
        addMember,
        updateMember,
        deleteMember,
        addContactInfo,
        deleteContactInfo
    }
}

module.exports = resolvers;