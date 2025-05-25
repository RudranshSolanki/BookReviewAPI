import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    book: {type:mongoose.Schema.Types.ObjectId,ref:'book',required:true},
    reviewer: {type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    rating:{type:Number,default:0},
    avgRating:{type:Number,min:0,max:5,default:0},
    review:{type:String,required:true}
})

const reviewModel = mongoose.model('Review',reviewSchema);

export default reviewModel;