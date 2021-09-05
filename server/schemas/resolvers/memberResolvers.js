const {Member} = require('../../models');

const memberResolvers = {
    //queries***************************
    members: async function(){
        return await Member.find({});
    },
    member: async function(_, {_id}){
        return await Member.findById(_id);
    },
    //mutations***************************
    addMember: async function(_, {member}){
        return await Member.create(member);
    },
    updateMember: async function(_, {_id, member}){
        return await Member.findByIdAndUpdate(_id, {...member}, {new: true});
    },
    deleteMember: async function(_, {_id}){
        return await Member.findByIdAndRemove(_id);
    },
};

module.exports = memberResolvers;