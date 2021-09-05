const mongoose = require('mongoose');

const mongoDB = `mongodb://localhost/mentorlink`;
const URI = process.env.MONGODB_URI;

mongoose.connect( URI || mongoDB );

module.exports = mongoose.connection;