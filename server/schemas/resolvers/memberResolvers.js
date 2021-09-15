const {Member} = require('../../models');
const {AuthenticationError} = require('apollo-server-express');
const {signJWT} = require('../../utils/auth');

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
        const newMember = await Member.create(member);

        //at this point, the member has been authenticated since they were just created, now we can give them authorization
        const token = signJWT(member);

        return {token, member: newMember};
    },

    loginMember: async function(_, {username, password}){
        //check the database for a member with the given username
        const member = await Member.findOne({username});
        if(!member) throw new AuthenticationError("Credentinals not authenticated.");

        //run the members validated password bool check to see if the supplied password matches
        const bIsAuthenticated = await member.validatePassword(password);
        if(!bIsAuthenticated) throw new AuthenticationError("Credentinals not authenticated.");

        //at this point, the member has been authenticated, now we can give them authorization
        const token = signJWT(member);

        //return the member since they are in the database and password is correct
        return {token, member};
    },

    //remaining resolvers below require authorization and will throw an error if the proper auth header is not provided
    updateMember: async function(_, {_id, member}, context){
        if(!context.member) throw new AuthenticationError('You must be logged in to perform this action.');

        return await Member.findByIdAndUpdate(_id, {...member}, {new: true});
    },

    deleteMember: async function(_, {_id}, context){
        if(!context.member) throw new AuthenticationError('You must be logged in to perform this action.');

        return await Member.findByIdAndRemove(_id);
    },

    addContactInfo: async function(_, {_id, contactInfo}, context){
        if(!context.member) throw new AuthenticationError('You must be logged in to perform this action.');
        
        return await Member.findByIdAndUpdate( _id, {contactInfo}, {new: true, runValidators: true});  
    },
    
    deleteContactInfo: async function(_, {_id}, context){
        if(!context.member) throw new AuthenticationError('You must be logged in to perform this action.');
            
        return await Member.findByIdAndUpdate(_id, {contactInfo: null}, {new: true});   
    },
};

module.exports = memberResolvers;