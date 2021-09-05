const mongoose = require('mongoose');

//Schema for member address and contact info
const contactInfoSchema = new mongoose.Schema(
    {
        phoneNumber:{
            type: String,
            maxlength: 10,
            minlength: 9,
            trim: true
        }, 
        email: {
            type: String,
            trim: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        streetNumber:{
            type: String,
            trim: true
        },
        streetName: {
            type: String,
            trim: true
        }, 
        suiteNumber: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true,
        },
        province: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
            enum: ['Canada', 'USA']
        },
        postalCode: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 6
        }
    }
);

const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First name is required',
        trim: true,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: 'Last name is required',
        trim: true,
        maxlength: 20
    },
    username: {
        type: String,
        required: 'First name is required',
        unique: true,
        trim: true,
        maxlength: 20
    },
    password: {
        type: String,
        required: 'Password is required',
        trim: true,
        minlength: 8
    },
    description: {
        type: String,
        trim: true,
        maxlength: 200
    },
    profilePicture: {
        type: String
    },
    industry: {
        type: mongoose.Types.ObjectId,
        ref: 'Industry'
    },
    mentorGroup: {
        type: mongoose.Types.ObjectId,
        ref: 'MentorGroup'
    },
    contactInfo: contactInfoSchema
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;