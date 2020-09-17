const {Schema} = require('mongoose');
const {model} = require('mongoose');

const user = Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports  = model('user',user);