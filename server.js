import './env.js'
import express from 'express'
import connectToMongoDB from './src/configs/mondb.config.js';
import reviewRoute from './src/features/review/review.route.js';
import userRoute from './src/features/user/user.route.js';
import bookRoute from './src/features/book/book.route.js';
import cookieParser from 'cookie-parser';


const PORT =process.env.PORT
const server = express();
server.use(express.json());
server.use(cookieParser())
server.use('/',userRoute)
server.use('/reviews',reviewRoute)
server.use('/books',bookRoute)






server.listen(PORT,()=>{
    console.log('server started');
    connectToMongoDB();
})