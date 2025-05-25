import mongoose from "mongoose";
import reviewModel from "../review/review.schema.js";
import bookModel from "./book.schema.js";


export class BookRepo{
    async addBook(data){
        try{
            const book = await bookModel.create(data);
            return book;
        }catch(err){
            console.log(err);
            throw new Error('error while adding book to db');
        }
    }   

    async getBooks(page,limit,author,genre){
        
        const query = {}
        if(genre)
            query.genre = genre;
        if(author)
            query.author = author
        const result = await bookModel.find(query).skip((page-1)*limit).limit(limit);
        return result;
    }

    async getBookDetails(id,page,limit){
        try{
            const book = await bookModel.findOne({_id:id},{name:1,genre:1,author:1,_id:0}).lean();
            const avgRating = await reviewModel.aggregate([
                {
                    $match:{
                        book:new mongoose.Types.ObjectId(id)
                    }
                }
                ,
                {
                    $group:{
                        _id:"$book",
                        avgRating:{$avg:"$rating"}
                    }
                },
                {
                    $project:{
                        avgRating:1,
                        _id:0
                    }
                }
            ])
            const reviews = await reviewModel.find({book:id},{rating:1,review:1,_id:0}).skip((page-1)*limit).limit(limit);
            if(book){
                book.avgRating = avgRating[0].avgRating
                book.review = reviews;
                console.log(book);
            }
            else{
                throw new Error("book not found");
            }
            return book;
        }
        catch(err){
            console.log(err);
            throw new Error('Something went wrong while getting book details');
        }
    }

    async addReview(bookId,userId,rating,newreview){
        try{
            const check = await reviewModel.find({book:bookId,reviewer:userId});
            if(check)
                throw new Error("Review Already published for this book")
            const review = await reviewModel.create({book:bookId,reviewer:userId,rating,review:newreview})
            return review;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async searchBook(regex){
        try{
            const books = await bookModel.find({$or:[{title:{$regex:regex}},{author:{$regex:regex}}]});
            return books;
        }
        catch(err){
            console.log(err)
            throw new Error("cant find books something went wrong");
        }
    }
}