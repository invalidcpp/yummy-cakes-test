const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    message: {type: String, required: true, minlength: 5, maxlength: 200},
    name: {type: String, required: true},
    yumFactor: {type: Number, required: true}
});

module.exports = mongoose.model('comment', commentSchema);