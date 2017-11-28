var mongoose = require('mongoose');

var ImageSchema = mongoose.Schema({
    image_name: String,
    path: String
});

module.exports = mongoose.model('images', ImageSchema);