import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

const sign = (user)=> jwt.sign(
  { id:user._id, role:user.role, name:user.name },
  process.env.JWT_SECRET || 'devsecret',
  { expiresIn:'7d' }
);

router.post('/register', async (req,res,next)=>{
  try{
    const {name, email, password} = req.body;
    if(!name || !email || !password) return res.status(400).json({message:'Missing fields'});
    const exists = await User.findOne({email});
    if(exists) return res.status(409).json({message:'Email already registered'});
    const hash = await bcrypt.hash(password, 10);
    const isFirst = (await User.countDocuments()) === 0;
    const user = await User.create({name, email, passwordHash: hash, role: isFirst?'admin':'user'});
    res.json({token: sign(user), user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  }catch(e){ next(e); }
});

router.post('/login', async (req,res,next)=>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message:'Invalid credentials'});
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(401).json({message:'Invalid credentials'});
    res.json({token: sign(user), user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  }catch(e){ next(e); }
});

export default router;
