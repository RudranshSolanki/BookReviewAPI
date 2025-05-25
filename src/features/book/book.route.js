import express from 'express'
import { BookController } from './book.controller.js';
import authenticateUser from '../../middleware/auth.middleware.js';


const bookRoute = express.Router();
const bookController = new BookController();

bookRoute.post('/',authenticateUser,(req,res)=>{
    bookController.addBook(req,res);
})
bookRoute.get('/search',authenticateUser,(req,res)=>{
    bookController.searchBook(req,res);
})
bookRoute.get('/',authenticateUser,(req,res)=>{
    bookController.getBooks(req,res);
})

bookRoute.get('/:id',authenticateUser,(req,res)=>{
    bookController.getBookDetails(req,res);
})

bookRoute.post('/:id/reviews',authenticateUser,(req,res)=>{
    bookController.addReview(req,res);
})




export default bookRoute;