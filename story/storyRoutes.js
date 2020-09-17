const { Router, response } = require('express');
const middleware = require('./middleware/storyMiddlewares')
const router = Router();
const Story = require('./models/story');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/stories', jsonParser, async function (req, res) {
    console.log(req.query);
    const story = await middleware.checkAndUpdate(req.query.userId, req.query.storyId);
    res.send(
        story
    );
});

router.post('/storyPost', jsonParser, function (req, res) {
    const story = Story(req.body);
    story.save();
    res.status(200).send({
        "storyCreated": true,
    })
});

router.get('/storiesPreview', async function (req, res) {
    const stories = await Story.find().limit(3);
    const previews = [];
    for (var i = 0; i < stories.length; i++) {
        previews.push({
            "title": stories[i].title,
            "_id": stories[i]._id.toString(),
        });
    }
    res.status(200).send({
        "previews": previews
    });

});

module.exports = router;