const {MentorGroup, Member} = require('../../models');
const { findById } = require('../../models/Industry');

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
        const group = await MentorGroup.create({mentor: mentorId, numMentees: numMentees, industry: industryId});
        const mentor = await Member.findByIdAndUpdate(mentorId, {mentorGroup: group._id}, {new: true});
        return {group, mentor};
    },
    deleteMentorGroup: async function(_, {mentorId, groupId}){
        const mentor = await Member.findByIdAndUpdate(mentorId, {mentorGroup: null});
        const group = await MentorGroup.findByIdAndDelete(groupId);
        return {group, mentor}
    },
    addMenteeToGroup: async function(_, {groupId, menteeId}){
        //find the group and check the mentor, 
        const group = await MentorGroup.findById(groupId);
        const groupMentorId = group.mentor._id.toString()

        //if the menteeId being added is the mentor or the next mentee will surpass the max group size 
        //then do not add and just return the group
        if(groupMentorId === menteeId || group.mentees.length >= group.numMentees) return group;
        
        // //if adding a correct mentee, add them to the mentee set
        group.mentees.addToSet(menteeId);
        return await group.save();
    },
    removeMenteeFromGroup: async function(_, {groupId, menteeId}){
        return await MentorGroup.findByIdAndUpdate(
            groupId,
            {$pull: {mentees: menteeId}},
            {new: true, runValidators: true}
        )
    },
    updateNumberOfMentees: async function(_, {groupId, numMentees}){
        //look for the group based on the given Id
        const group = await MentorGroup.findById(groupId);

        //if the array of mentees is greater than the proposed number of mentees then return the group
        //can't lower the number of mentees below the mentees who are already in the group
        if(numMentees < group.mentees.length) return group;

        //change the number of mentees tied to the group and save the document
        group.numMentees = numMentees;
        return await group.save();
    },
    addMessage: async function(_, {groupId, content}){
        return await MentorGroup.findByIdAndUpdate(
            groupId,
            {$push: {conversation: {creator: content.creator, text: content.text}}},
            {new: true, runValidators: true}
        )
    },
    deleteMessage: async function(_, {groupId, messageId}){
        const group = await MentorGroup.findById(groupId);
        group.conversation.pull(messageId);
        return await group.save();
    }

};

module.exports = mentorGroupResolvers;