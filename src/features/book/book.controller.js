import { BookRepo } from "./book.repo.js";

export class BookController{
    constructor(){
        this.bookRepo = new BookRepo();
    }

    async addBook(req,res){
        try{
            const {title,author,genre} = req.body;
            const result = await this.bookRepo.addBook({title,author,genre});
            return res.status(201).send({message:"book added",book:result})
        }
        catch(err){
            return res.status(400).send({error:"something went wrong while adding book"});
        }
    }

    async getBooks(){
        //with pagination and filter by author and genere
        try{
            const {page =1 ,limit=5} = req.query;
            const {author,genre} = req.body
            const result = await this.bookRepo.getBooks(page,limit,author,genre);
            return res.status(200).send({books:result})
        }
        catch(err){
            return res.status(400).send({error:"something went wrong while fetching the book"});
        }
    }

    async getBookDetails(req,res){
        //get book detail by id and review with pagination
        try{
            const {id} = req.params;
            const {page=1,limit=5} = req.query;
            const book = await this.bookRepo.getBookDetails(id,page,limit);
            return res.status(200).send({"message":book});
        }
        catch(err){
            console.log(err);
            return res.status(400).send({error:err});
        }
    }

    async addReview(req,res){
        try{
            const {id} = req.params
            const userId = req.userId;
            const {rating,review} = req.body;
            const newReview = await this.bookRepo.addReview(id,userId,rating,review);
            return res.status(201).send({message:"review Added"});
        }
        catch(err){
           return res.status(400).send({error:err});
        }
    }

    async searchBook(req,res){
        try{
            const {keyword} = req.query;
            console.log(keyword);
            if(!keyword)
                throw new Error("keyword is required to search");
            
            const regex = new RegExp(keyword,'i');
            const books = await this.bookRepo.searchBook(regex);
            return res.status(200).send({books});
        }
        catch(err){
            console.log(err);
            return res.status(200).send({error:err})
        }
    }

}