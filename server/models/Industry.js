const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
    //name of the industry
    name: {
        type: String,
        required: 'Industry name is required.',
        maxlength: 24,
        unique: true,
        trim: true
    }
});

//before saving the industry, change the name to lower case
industrySchema.pre('save', function(next){
    this.name = this.name.toLowerCase();
    next();
})

const Industry = mongoose.model('Industry', industrySchema);

module.exports = Industry;