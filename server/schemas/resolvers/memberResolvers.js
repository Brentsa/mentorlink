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
    addContactInfo: async function(_, {_id, contactInfo}){
        const member = await Member.findByIdAndUpdate(
            _id,
            {contactInfo},
            {new: true, runValidators: true}
        );

        return member
    },
    updateContactInfo: async function(_, {_id, contactInfo}){
        const member = await Member.findByIdAndUpdate(
            _id,
            {contactInfo},
            {new: true, runValidators: true}
        )

        return member
    },
    deleteContactInfo: async function(_, {_id}){

    },
};

module.exports = memberResolvers;