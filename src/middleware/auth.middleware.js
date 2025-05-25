import jwt from 'jsonwebtoken'

const authenticateUser =async(req,res,next)=>{
    try{
        const {token} = req.cookies
        const payload = jwt.verify(token,process.env.JWT_TOKEN)
        req.userId = payload.userId;
        next();
    }
    catch(err){
        return res.status(400).send('not autenticated');
    }
}

export default authenticateUser;