import reviewModel from "./review.schema.js";

export class ReviewRepo{
    

    async updateReview(id,userId,rating,review){
        try{
            const updatedReview = await reviewModel.findOne({_id:id,reviewer:userId})
            if(!updatedReview)
                throw new Error('review not found');
            if(rating)
            updatedReview.rating = rating;
            if(review)
            updatedReview.review = review;
            await updatedReview.save();
            return updatedReview;
        }
        catch(err){
            throw new Error(err)
        }
        
    }
    
    async deleteReview(id,userId){
        try{    
            const review = await reviewModel.deleteOne({_id:id,reviewer:userId});
            if(!review)
                throw new Error('review not found');
            return review;
        }
        catch(err){
            throw new Error(err);
        }
    }
}
