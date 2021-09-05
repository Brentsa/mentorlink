const { industries, industry, addIndustry, deleteIndustry } = require('./resolvers/industryResolvers');
const { members, member, addMember, updateMember, deleteMember} = require('./resolvers/memberResolvers');

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
        deleteMember
    }
}

module.exports = resolvers;