const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const lendController = require('../controllers/lendControllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.get('/lendBooks', lendController.lendBooks);

module.exports = router;
