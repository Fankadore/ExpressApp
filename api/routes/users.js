const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.js');

router.post('/signup', UsersController.signup);
router.post('/signin', UsersController.signin);
router.delete('/:userId', UsersController.deleteUser);

module.exports = router;
