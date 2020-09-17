const express =  require('express');
const mongooese =  require ('mongoose');
const cors = require('cors');
const storyRoutes = require ('./story/storyRoutes');
const authRoutes = require('./auth/authRoutes');
const config  = require('./config/config');
const e = require('express');
app = express();
app.use(cors());

mongooese.connect(config.DATABASE,config.OPTIONS,() => console.log("connected to db"));
// console.log(config.DATABASE);

app.use('/auth',authRoutes);

app.use('/story',storyRoutes);

app.listen(process.env.PORT||8000);
