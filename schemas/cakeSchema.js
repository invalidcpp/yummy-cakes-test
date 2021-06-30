const mongoose = require('mongoose');
const commentSchema = require("./commentSchema");

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    comments: {type: Array, default: [commentSchema.schema]},
    imageURL: {type: String, required: true },
    yumFactor: {type: Number, required: true }
});

module.exports = mongoose.model('cake', cakeSchema);