import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req, res, next)=>{
    // console.log(req.body);
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'))
    }
    // here we encrypt the password by using bcrypt
    const hashedPassword = bcryptjs.hashSync(password, 10);

    //new user to work acc to user model
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })
    // when user enter duplicate data it shows catch error 
    try {
        // saving data after hitting api
        await newUser.save()
        res.json('Signup successfully.');
    } catch (error) {
        next(error);
    }
    
}