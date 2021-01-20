'use strict';

const express = require('express');
const route = express();
const api = require('./api');

route.get('/', api.listAllUser);
route.get('/:userId', api.getUser);
route.delete('/:userId', api.deleteUser)
route.patch('/me', api.editProfile);
route.patch('/:userId', api.editUser);
route.get('/me', api.getMe);
route.post('/change-avatar', api.changeAvatar);
route.get('/search', api.searchUser);

module.exports = route