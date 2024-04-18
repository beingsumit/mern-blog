import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req, res)=>{
    // console.log(req.body);
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message : 'All fields are required'})
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
        res.status(500).json({message: error.message})
    }

    
}