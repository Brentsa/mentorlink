const {Industry} = require('../../models');

const industryResolvers = {
    //queries***************************
    industries: async function(){
        return Industry.find({});
    },
    industry: async function(_, {_id}){
        return Industry.findById(_id);
    },

    //mutations***************************
    addIndustry: async function(_, args){
        return Industry.create(args)
    },
    deleteIndustry: async function(_, {_id}){
        return Industry.findByIdAndRemove(_id);
    }
}

module.exports = industryResolvers;