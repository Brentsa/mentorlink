const { valueFromAST } = require('graphql');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Types.ObjectId,
        required: 'Creator is required',
        ref: 'Member'
    },
    text: {
        type: String,
        trim: true,
        required: 'Text is required in a message',
        maxlength: 250
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    read: {
        type: Boolean,
        default: false
    }
})

const mentorGroupSchema = new mongoose.Schema({
    //A mentor group has to have a mentor
    mentor: {
        type: mongoose.Types.ObjectId,
        required: 'Mentor is required',
        ref: 'Member'
    },
    //number of mentees are required
    numMentees: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    mentees: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Member'
        }]
    },
    industry: {
        type: mongoose.Types.ObjectId,
        ref: 'Industry'
    },
    conversation: [messageSchema]
});


const MentorGroup = mongoose.model('MentorGroup', mentorGroupSchema);

module.exports = MentorGroup;