import bcrypt from 'bcrypt'
import { UserRepo } from './user.repo.js';
import jwt from 'jsonwebtoken'
export class UserController{
    constructor(){
        this.userRepo = new UserRepo();
    }

    async signup(req,res){
        try{
            const{name,email,password} = req.body;
            const hashedPassword = await bcrypt.hash(password,12);
            const result = await this.userRepo.signup({name,email,password:hashedPassword})
            return res.status(201).send(result);
        }
        catch(err){
            console.log(err);
            return res.status(400).send('Something went while signup');
        }

    }

    async login(req,res){
        try{
            const {email,password} = req.body;
            const user = await this.userRepo.getUser(email);
            const result = await bcrypt.compare(password,user.password);
            if(!result)
                return res.status(400).send("Invalid Credentials");
            const token = jwt.sign({userId:user._id},process.env.JWT_TOKEN,{expiresIn:'1h'})
            return res.status(200).cookie("token",token,{maxAge:90000000,httpOnly:true}).send('Login Success');
        }
        catch(err){
            console.log(err);
            return res.status(400).send(err);
        }
    }
}