import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'


// we used "npm i dotenv" for importing mongodb connection 
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDB is connected')
})
.catch((err) => {
    console.log(err);
});

const app = express()

app.listen(3000, ()=>{
    console.log("server is running on 3000");
})

// here we write api in userRouter file and call here 
app.use('/api/user', userRouter);