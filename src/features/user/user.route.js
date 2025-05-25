import express from 'express'
import { UserController } from './user.controller.js';

const userRoute = express.Router();
const userController = new UserController();

userRoute.post('/signup',(req,res)=>{
    userController.signup(req,res);
})

userRoute.get('/login',(req,res)=>{
    userController.login(req,res)
})

export default userRoute;