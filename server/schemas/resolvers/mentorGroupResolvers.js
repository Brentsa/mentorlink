const {MentorGroup, Member} = require('../../models');
const { findById } = require('../../models/Industry');

const mentorGroupResolvers = {
    //queries***************************
    mentorGroups: async function(){
        return await MentorGroup.find({})
            .populate('mentor')
            .populate('industry')
            .populate('mentees');
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
        //find the group and check the mentor, if the menteeId being added is the mentor
        //then do not add and just return the group
        const findGroup = await MentorGroup.findById(groupId);
        const groupMentorId = findGroup.mentor._id.toString()
        if(groupMentorId === menteeId) return findGroup;
        
        //if adding a correct mentee, add them to the mentee set
        const group = await MentorGroup.findByIdAndUpdate(
            groupId,
            {$addToSet: {mentees: menteeId}},
            {new: true, runValidators: true}
        )

        return group
    },
    removeMenteeFromGroup: async function(_, {groupId, menteeId}){
        const group = await MentorGroup.findByIdAndUpdate(
            groupId,
            {$pull: {mentees: menteeId}},
            {new: true, runValidators: true}
        )

        return group;
    }
};

module.exports = mentorGroupResolvers;