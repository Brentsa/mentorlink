const {MentorGroup, Member} = require('../../models');
const {AuthenticationError} = require('apollo-server-express');

const mentorGroupResolvers = {
    //queries***************************
    mentorGroups: async function(){
        return await MentorGroup.find({})
            .populate('mentor')
            .populate('industry')
            .populate('mentees')
    },

    mentorGroup: async function(_, {_id}){
        return await MentorGroup.findById(_id)
            .populate('mentor')
            .populate('industry')
            .populate('mentees');
    },

    //mutations***************************
    addMentorGroup: async function(_, {mentorId, numMentees, industryId}){
        //create a new group
        const group = await MentorGroup.create({mentor: mentorId, numMentees: numMentees, industry: industryId});

        //add the mentor group to the mentor
        const mentor = await Member.findByIdAndUpdate(mentorId, {mentorGroup: group._id}, {new: true});

        return {group, member: mentor};
    },

    deleteMentorGroup: async function(_, {groupId}, context){
        //query group and remove the mentorId argument
        const group = await MentorGroup.findById(groupId);

        //The member with auth must be the mentor of the group to delete it
        if(!context.member || group.mentor._id != context.member._id) return new AuthenticationError('You must be logged in and only the mentor can delete their group.');

        //remove the group from the mentor 
        const mentor = await Member.findByIdAndUpdate(group.mentor._id, {mentorGroup: null});

        //delete the group
        const deletedGroup = await MentorGroup.findByIdAndDelete(groupId);

        await Member.updateMany({mentorGroup: groupId}, {mentorGroup: null});

        return {group: deletedGroup, member: mentor};
    },
    
    addMenteeToGroup: async function(_, {groupId, menteeId}, context){
        if(!context.member) return new AuthenticationError('You must be logged in to perform this action.')

        //find the group and check the mentor, 
        const group = await MentorGroup.findById(groupId).populate("mentor");
        const groupMentorId = group?.mentor._id.toString();

        //if the menteeId being added is the mentor or the next mentee will surpass the max group size 
        //then do not add and just return the group
        if(groupMentorId === menteeId || group.mentees.length >= group.numMentees) return group;
        
        //if adding a correct mentee, add them to the mentee set
        group.mentees.addToSet(menteeId);

        //find the mentee and update their mentor group
        const mentee = await Member.findByIdAndUpdate(menteeId, {mentorGroup: groupId}, {new: true});

        return {group: await group.save(), member: mentee};
    },

    removeMenteeFromGroup: async function(_, {groupId, menteeId}, context){
        if(!context.member) return new AuthenticationError('You must be logged in to perform this action.')

        //find the group and remove the mentee from it
        const group = await MentorGroup.findByIdAndUpdate(groupId, {$pull: {mentees: menteeId}}, {new: true, runValidators: true})

        //find the mentee and remove the group relation
        const member = await Member.findByIdAndUpdate(menteeId, {mentorGroup: null}, {new: true});

        return {group, member};
    },

    updateNumberOfMentees: async function(_, {groupId, numMentees}, context){
        //look for the group based on the given Id
        const group = await MentorGroup.findById(groupId);

        //The member with auth must be the mentor of the group to delete it
        if(!context.member || group.mentor._id != context.member._id) return new AuthenticationError('You must be logged in and only the mentor can update their group.');

        //if the array of mentees is greater than the proposed number of mentees then return the group
        //can't lower the number of mentees below the mentees who are already in the group
        if(numMentees < group.mentees.length) return group;

        //change the number of mentees tied to the group and save the document
        group.numMentees = numMentees;
        return await group.save();
    },

    addMessage: async function(_, {groupId, content}, context){
        if(!context.member) return new AuthenticationError('You must be logged in to perform this action.')

        return await MentorGroup.findByIdAndUpdate( groupId, {$push: {conversation: {creator: content.creator, text: content.text}}}, {new: true, runValidators: true})
    },

    readMessage: async function(_, {groupId, messageId}, context){
        if(!context.member) return new AuthenticationError('You must be logged in to perform this action.')

        //find the group that contains the messages to update
        const group = await MentorGroup.findById(groupId);

        try{
           //iterate through the conversation and change the message that matches the supplied ID to read
            for(var i = 0; group.conversation.length; i++){
                if(group.conversation[i]._id.toString() === messageId){
                    group.conversation[i].read = true
                    return await group.save();
                }
            } 
        }
        catch{ 
            return group; 
        }
    },

    deleteMessage: async function(_, {groupId, messageId}, context){
        if(!context.member) return new AuthenticationError('You must be logged in to perform this action.')

        const group = await MentorGroup.findById(groupId);
        group.conversation.pull(messageId);
        return await group.save();
    }
};

module.exports = mentorGroupResolvers;