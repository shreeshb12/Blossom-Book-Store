const express= require('express');
const router=express.Router();
const controller=require('../controllers/book-controller');

//Routes
router.get('/book',controller.getAllBooks);

router.post('/book',controller.addBook);

router.get('/book/:bookId',controller.getById);

router.patch('/book/:bookId',controller.update);

router.delete('/book/:bookId',controller.deleteBook);

module.exports=router;