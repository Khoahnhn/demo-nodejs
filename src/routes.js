const express = require('express');
const router = express();

const auth = require('./controllers/auth/router');
router.use('/auth', auth);

const user = require('./controllers/user/router');
router.use('/users', user);

module.exports = router