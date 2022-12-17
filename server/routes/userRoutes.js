const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

//Add User 
router.post('/', userController.addUser);

//Get All the user
router.get('/', userController.getUsers);

module.exports = router;