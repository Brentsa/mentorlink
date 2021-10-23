const {Member} = require('../../models');
const {AuthenticationError} = require('apollo-server-express');
const {signJWT} = require('../../utils/auth');

const memberResolvers = {
    //queries***************************
    members: async function(){
        return await Member.find({});
    },

    member: async function(_, {username}){
        return await Member.findOne({username})
        .populate("industry")
        .populate("contactInfo")
        .populate({path: "mentorGroup", populate: [{path: "mentor", populate: "industry"}, {path: "mentees", populate: "username"}]});
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
        if(!member) throw new AuthenticationError("Incorrect username and/or password.");

        //run the members validated password bool check to see if the supplied password matches
        const bIsAuthenticated = await member.validatePassword(password);
        if(!bIsAuthenticated) throw new AuthenticationError("Incorrect username and/or password.");

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

    addIndustryToMember: async function(_, {memberId, industryId}, context){
        if(!context.member) throw new AuthenticationError("You must be logged in to add an industry");

        return await Member.findOneAndUpdate(memberId, {industry: industryId}, {new: true, runValidators: true}).populate("industry");
    },

    deleteMember: async function(_, {_id}, context){
        if(!context.member) throw new AuthenticationError('You must be logged in to perform this action.');

        return await Member.findByIdAndRemove(_id);
    },

    addContactInfo: async function(_, {_id, contactInfo}, context){
        if(!context.member) throw new AuthenticationError('You must be logged in to perform this action.');
        
        return await Member.findByIdAndUpdate( _id, {contactInfo}, {new: true, runValidators: true}).populate('contactInfo');  
    },
    
    deleteContactInfo: async function(_, {_id}, context){
        if(!context.member) throw new AuthenticationError('You must be logged in to perform this action.');
            
        return await Member.findByIdAndUpdate(_id, {contactInfo: null}, {new: true});   
    },
};

module.exports = memberResolvers;