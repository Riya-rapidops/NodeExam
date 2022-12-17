const express = require('express');
const authController = require('../controller/auth');
const router = express.Router();


//Authenticate User
router.post('/', authController.getLogin);

module.exports = router;
