'use strict';

const response = require('../base/response');
const service = require('./service');
const {User} = require('./models/user');
const formidable = require('formidable');
const fs = require('fs');
const typeImage = ['image/png', 'image/jpeg'];
const {network} = require('../../../config/config');

async function listAllUser(req, res){
    try{
        let listUser = await service.listUser();
        return response.ok(res, listUser)
    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

async function getUser(req, res){
    try{
        let userId = req.params.userId
        let user = await service.getUserById(userId);
        return response.ok(res, user);
    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

async function getMe(req, res){
    try{
        let userId = req.user._id;
        let user = await service.getUserById(userId);
        return response.ok(res, user);
    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

async function changeAvatar(req, res){
    try{
        let form = new formidable.IncomingForm();
        form.uploadDir = "static/"
        form.parse(req, async (err, fields, files) => {
            let newPath;
            if(files.avatar !== undefined){
                if(!typeImage.includes(files.avatar.type)) return response.badData(res, "Type dosen't support!!");
                let oldPath = files.avatar.path;
                newPath = `${form.uploadDir}avatar/${Date.now()}-${files.avatar.name}`;
                fs.renameSync(oldPath, newPath);
            }
            let photo = `http://${network.hostname}:${network.port}/${newPath}`;
            if(newPath === undefined){
                photo = undefined;
            }
            let user = await User.findByIdAndUpdate(req.user._id, {avatar: photo}, {new: true});
            return response.ok(res, user);
        })
    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

async function searchUser(req, res){
    try{

    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

async function editUser(req, res){
    try{
        let userId = req.params.userId;
        const {fullName, address, gender, phoneNumber} = req.body

        let getUser = await service.getUserById(userId);
        if(!getUser) return response.badRequest(res, "User dosen't exists");

        let info = {
            fullName: !fullName ? getUser.fullName : fullName,
            address: !address ? getUser.address: address,
            gender: !gender ? getUser.gender: gender,
            phoneNumber: !phoneNumber ? getUser.phoneNumber: phoneNumber
        }
        let updateUser = await User.findByIdAndUpdate(userId, info, {new: true});
        return response.ok(res, updateUser);
    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

async function editProfile(req, res){
    try{
        const {fullName, address, gender} = req.body;
        let getUser = await service.getUserById(req.user._id);
        let info = {
            fullName: !fullName ? getUser.fullName: fullName,
            address: !address ? getUser.address: address,
            gender: ! gender ? getUser.gender: gender,
            phoneNumber: !phoneNumber ? getUser.phoneNumber: phoneNumber
        }
        let updateProfile = await User.findByIdAndUpdate(req.user._id, info, {new: true});
        return response.ok(res, updateProfile);
    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

async function deleteUser(req, res){
    try{
        let userId = req.params.userId
        let getUser = await service.getUserById(userId);
        if(!getUser) return response.badRequest(res, "User doesn't exists");
        await User.findByIdAndDelete(userId);
        return response.noContent(res);
    }catch (error){
        log.error(error);
        return response.internal(res, error);
    }
}

module.exports = {
    listAllUser,
    getUser,
    getMe,
    changeAvatar,
    searchUser,
    editProfile,
    deleteUser,
    editUser
}
