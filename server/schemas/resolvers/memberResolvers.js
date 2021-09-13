const {Member} = require('../../models');
const {AuthenticationError} = require('apollo-server-express');

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
    loginMember: async function(_, {username, password}){
        //check the database for a member with the given username
        const member = await Member.findOne({username});
        if(!member) throw new AuthenticationError("Credentinals not authenticated.");

        //run the members validated password bool check to see if the supplied password matches
        const bIsAuthenticated = await member.validatePassword(password);
        if(!bIsAuthenticated) throw new AuthenticationError("Credentinals not authenticated.");

        //return the member since they are in the database and password is correct
        return member;
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
    deleteContactInfo: async function(_, {_id}){
        const member = await Member.findByIdAndUpdate(
            _id,
            {contactInfo: null},
            {new: true}
        );

        return member
    },
};

module.exports = memberResolvers;