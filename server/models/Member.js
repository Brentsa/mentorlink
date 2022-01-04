const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Schema for member address and contact info
const contactInfoSchema = new mongoose.Schema(
    {
        phoneNumber:{
            type: String,
            maxlength: 10,
            trim: true,
            validate: {
                validator: function(val){
                    return val.length >= 9 || val === '';
                },
                message: () => 'Phone number must be at least 9 characters'
            }
        }, 
        email: {
            type: String,
            trim: true,
            match: /(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)/
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
            enum: ['', 'Canada', 'USA']
        },
        postalCode: {
            type: String,
            trim: true,
            maxlength: 6,
            validate: {
                validator: function(val){
                    return val.length >= 5 || val === '';
                },
                message: () => 'Postal code must be at least 5 characters'
            }
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

//before saving the document to the database, hash the password async
memberSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//checks a supplied password against the documents password and returns true if a match
memberSchema.methods.validatePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;