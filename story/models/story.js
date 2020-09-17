const { Schema } = require('mongoose');
const { model } = require('mongoose');

const Story = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    viewsTotal: {
        type: Number,
        required: true,
    },
    viewedBy: {
        type: Array ,
        default:[]
    },
});

module.exports = model('story', Story);