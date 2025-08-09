import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

router.get('/', async (req,res,next)=>{
  try{
    const items = await Product.find().sort({createdAt:-1}).limit(1000);
    res.json(items);
  }catch(e){ next(e); }
});

router.post('/', async (req,res,next)=>{
  try{
    const item = await Product.create(req.body);
    res.status(201).json(item);
  }catch(e){ next(e); }
});

router.get('/:id', async (req,res,next)=>{
  try{
    const item = await Product.findById(req.params.id);
    if(!item) return res.status(404).json({message:'Not found'});
    res.json(item);
  }catch(e){ next(e); }
});

router.put('/:id', async (req,res,next)=>{
  try{
    const item = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!item) return res.status(404).json({message:'Not found'});
    res.json(item);
  }catch(e){ next(e); }
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const item = await Product.findByIdAndDelete(req.params.id);
    if(!item) return res.status(404).json({message:'Not found'});
    res.json({ok:true});
  }catch(e){ next(e); }
});

export default router;
