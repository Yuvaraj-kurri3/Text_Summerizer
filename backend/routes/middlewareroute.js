import loginornot from '../middlewares/loginedornot.js';
import express from 'express';
const router=express.Router();

router.get('/loginornot',loginornot,(req,res)=>{
    res.status(200).json({ isLoggedIn: true, user: req.user });
});
export default router;