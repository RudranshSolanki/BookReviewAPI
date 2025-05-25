import { ReviewRepo } from "./review.repo.js";

export class ReviewController{
    constructor(){
        this.reviewRepo = new ReviewRepo();
    }

    
    async updateReview(req,res){
        try{
            const {id} = req.params;
            const userId = req.userId;
            const {rating,review} = req.body
            const updateReview = await this.reviewRepo.updateReview(id,userId,rating,review);
            return res.status(201).send({message:"review updated"})
        }
        catch(err){
            return res.status(400).send('something went wrong while updating review');
        }
    }
    async deleteReview(req,res){
        try{
            const {id} = req.params;
            const userId = req.userId;
            const user = await this.reviewRepo.deleteReview(id,userId);
            return res.status(200).send({message:"review deleted"})
        }
        catch(err){
            return res.status(400).send('something went wrong while deleting review');
        }
    }
}