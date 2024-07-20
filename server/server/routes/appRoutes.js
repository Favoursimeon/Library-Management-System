const express = require('express');
const router = express.Router();
const lendControllers = require('../controllers/lendControllers');

router.get('/lendBooks', lendControllers.getLendBooks);
router.get('/returnedBooks', lendControllers.getReturnedBooks);
router.post('/lendBooks', lendControllers.addLendBook);
router.post('/returnedBooks', lendControllers.returnBook);
router.delete('/lendBooks/:id', lendControllers.deleteLendBook);
router.put('/lendBooks/:id', lendControllers.updateLendBook);

module.exports = router;
