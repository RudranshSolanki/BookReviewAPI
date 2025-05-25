import userModel from "./user.schema.js";

export class UserRepo{
    async signup(data){
        const user = await userModel.create(data);
        return user;
    }
    async getUser(email){
        const user = await userModel.findOne({email});
        if(user)
            return user;
        else
            throw new Error("User not found");
    }
}