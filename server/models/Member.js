const mongoose = require('mongoose');
const contactInfoSchema = require('./ContactInfo');

const memberSchema = new mongoose.Schema({

});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;