const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");

const encrypt = async function (password) {
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    return passwordEncrypted;
}

const exists = async function (user) {
    const users = await User.findOne({ 'userName': user });
    if (!users) {
        return false;
    }
    return users;
}

const authenticate = async function (userReq) {
    const user = await exists(userReq.userName);
    console.log(user);
    return bcrypt.compareSync(userReq.password, user.password);

}

const createuser = async function (userReq) {
    
    const passEncrypted = await encrypt(userReq.password);
    const newUser = User({
        userName:userReq.userName,
        password:passEncrypted,
    });
    await newUser.save();
}

module.exports = {createUser:createuser,auth:authenticate};
    
