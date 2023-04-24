const express = require('express');
const router = express.Router();
const user = require('./user');
const admin = require('./admin');

router.use(user);
router.use(admin);

module.exports = router;
