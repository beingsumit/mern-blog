import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'



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

app.use(express.json());

app.listen(3000, ()=>{
    console.log("server is running on 3000");
})

// here we write api in userRouter file and call here
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'INternal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })

})