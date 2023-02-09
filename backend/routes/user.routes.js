const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/log-in', UserController.logIn);
router.post('/sign-in', UserController.signIn);

module.exports = router;
