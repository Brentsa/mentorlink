const mongoose = require('mongoose');

const mongoDB = `mongodb://localhost/mentorlink`;

mongoose.connect(process.env.MONGODB_URI || mongoDB);

module.exports = mongoose.connection;