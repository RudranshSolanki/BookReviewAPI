import mongoose from "mongoose";


const bookSchema = mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,enum:['Mystery','Horror']},
   
})

const bookModel = mongoose.model('Book',bookSchema);

export default bookModel;