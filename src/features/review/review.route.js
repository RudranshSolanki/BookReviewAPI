import express from 'express'
import authenticateUser from '../../middleware/auth.middleware.js';
import { ReviewController } from './review.controller.js';


const reviewRoute = express.Router();
const reviewController = new ReviewController();
reviewRoute.put('/:id',authenticateUser,(req,res)=>{
    reviewController.updateReview(req,res);
})

reviewRoute.delete('/:id',authenticateUser,(req,res)=>{
    reviewController.deleteReview(req,res);
})

export default reviewRoute;