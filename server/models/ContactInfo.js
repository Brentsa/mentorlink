const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
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
        required: 'City required.'
    },
    province: {
        type: String,
        trim: true,
        required: 'Province required.'
    },
    country: {
        type: String,
        trim: true,
        required: 'Country required.',
        enum: ['Canada', 'USA']
    },
    postalCode: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 6
    }
});

module.exports = contactInfoSchema ;