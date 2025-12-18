const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
        },
        username: {
            type: String,
            required: [true, 'Please add a username'],
        },
        tags: {
            type: [String],
            default: [],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: false, // We use createdAt manually as per requirement, but could use timestamps: true
    }
);

module.exports = mongoose.model('Post', postSchema);
