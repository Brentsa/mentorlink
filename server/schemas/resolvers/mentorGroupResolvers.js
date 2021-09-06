const {MentorGroup, Member} = require('../../models');

const mentorGroupResolvers = {
    //queries***************************
    mentorGroups: async function(){
        return await MentorGroup.find({}).populate('mentor').populate('industry');
    },
    mentorGroup: async function(_, {_id}){
        return await MentorGroup.findById(_id).populate('mentor').populate('industry');
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
    }
};

module.exports = mentorGroupResolvers;