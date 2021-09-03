const { industries, industry, addIndustry, deleteIndustry } = require('./resolvers/industryResolvers');

const resolvers = {
    Query: {
        industry,
        industries 
    },
    Mutation:{
        addIndustry,
        deleteIndustry
    }
}

module.exports = resolvers;