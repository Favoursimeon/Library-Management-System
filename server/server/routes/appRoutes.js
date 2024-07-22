const express = require('express');
const router = express.Router();
const lendControllers = require('../controllers/lendControllers');
const bookController = require('../controllers/bookControllers');
const memberControllers = require('../controllers/memberControllers');

router.get('/bookTable', bookController.getAllBooks);
router.post('/bookTable', bookController.addBook);
router.delete('/bookTable/:id', bookController.deleteBook);
router.put('/bookTable/:id', bookController.updateBook);

router.get('/lendBooks', lendControllers.getLendBooks);
router.get('/returnedBooks', lendControllers.getReturnedBooks);
router.post('/lendBooks', lendControllers.addLendBook);
router.post('/returnedBooks', lendControllers.returnBook);
router.delete('/lendBooks/:id', lendControllers.deleteLendBook);
router.put('/lendBooks/:id', lendControllers.updateLendBook);

router.get('/members/', memberControllers.getAllMembers);
router.get('/members/:id', memberControllers.getMemberById);
router.post('/members/', memberControllers.createMember);
router.put('/members/:id', memberControllers.updateMember);
router.delete('/members/:id', memberControllers.deleteMember);


  


module.exports = router;
