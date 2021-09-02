const mongoose = require('mongoose');

const mongoDB = `mongodb://localhost/mentorlink`;

const mongooseOptions = {
    // useNewUrlParser: true, 
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
};

mongoose.connect(process.env.MONGODB_URI || mongoDB, mongooseOptions).catch(error => handleError(error));

module.exports = mongoose.connection;