const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'avatar\\unknown.png'
    },
    gender: {
        type: String,
        enum: ['male','female','unknown'],
        default: 'unknown'
    },
    isActive:{
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
},{ versionKey: false });

UserSchema.index({ email: 1 });
const User = mongoose.model("users", UserSchema);
module.exports = {
    User
};