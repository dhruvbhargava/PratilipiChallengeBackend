const mongoose = require('mongoose');
const story = require('../models/story');
const user = require('../../auth/models/user');

var checkNUpdate = async function (userId, storyId) {
    const post = await story.findOne({ '_id': storyId});
    for(i = 0;i<post.viewedBy.length;i++){
        if(userId == post.viewedBy[i]){
            return post;
        }
    }
    post.viewsTotal+=1;
    post.viewedBy.push(userId);
    post.save();
    return post;
}

module.exports =  {checkAndUpdate:checkNUpdate}
