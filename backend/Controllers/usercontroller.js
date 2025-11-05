// const userSchema=require('../models/User');

import userSchema from '../models/User.js';
import jwt from 'jsonwebtoken';
import client from '../redisClient.js';

import bcrypt from 'bcrypt';

 export const signup=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser=await userSchema.findOne({email:email});
        if(existingUser){
            return res.status(200).json({message:"User already exists"});
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const newUser=new userSchema({name,email,password:hashedpassword});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }
    catch(err){
        console.log("Error in signup:",err);
        res.status(500).json({message:err.message});
    }
};

export const login=async(req,res)=>{

    const{email,password}=req.body;
    try{
        const existingUser= await userSchema.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User not found!"});
        }
        const isPasswordCorrect= await bcrypt.compare(password,existingUser.password);
         if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        // 29-10-2025: Generating JWT token and setting it in HttpOnly cookie
        const token = jwt.sign({id:existingUser._id}, process.env.JWT_SECRET, {expiresIn:'10d'});
        
        res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 10 * 24 * 60 * 60 * 1000
});
         
         res.status(200).json({
            message: "Login successfull",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                token: token
            }
        });
    }
    catch(err){
        res.status(500).json({message:"Server error"});

    }
}

export const logout= (req, res) => {
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
 };
