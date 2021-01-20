'use strict';

const {User} = require('./models/user');

async function listUser(){
    return User.find()
}

async function getUserById(userId){
    return User.findById(userId);
}

module.exports = {
    listUser,
    getUserById
}