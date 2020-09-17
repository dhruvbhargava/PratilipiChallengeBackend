const { Router } = require('express');
const middleware = require('./middleware/authMiddlewares');
const router = Router();
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/signIn',jsonParser, async function (req, res) {
    console.log(req.query);
    
    try {
        const authenticated = await middleware.auth(req.query);
        if(!authenticated)
            throw err;
        res.send({
            "authenticated?": authenticated
        });
    } catch (e) {
        res.send({
            "authenticated?": false,
            "error": "wrong username or password"
        })
    }
});

router.get('/signUp', jsonParser, async function (req, res) {
    console.log(req.query);	
    try {
        await middleware.createUser(req.query);
        res.send({
            "userCreated": true
        });
    }
    catch (e) {
        res.send({
            "userCreated": false,
            "error": e.message
        })
    }
});

module.exports = router;

