import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Sale from '../models/Sale.js';

export const guard = (req,res,next)=>{
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ')? auth.slice(7): null;
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = decoded;
    next();
  }catch(e){
    return res.status(401).json({message:'Unauthorized'});
  }
};

const router = Router();

router.get('/', async (req,res,next)=>{
  try{
    const {from, to} = req.query;
    const q = {};
    if(from || to){
      q.date = {};
      if(from) q.date.$gte = new Date(from);
      if(to) q.date.$lte = new Date(to);
    }
    const sales = await Sale.find(q).populate('product').sort({createdAt:-1}).limit(500);
    res.json(sales);
  }catch(e){ next(e); }
});

router.post('/', async (req,res,next)=>{
  try{
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  }catch(e){ next(e); }
});

router.get('/:id', async (req,res,next)=>{
  try{
    const sale = await Sale.findById(req.params.id).populate('product');
    if(!sale) return res.status(404).json({message:'Not found'});
    res.json(sale);
  }catch(e){ next(e); }
});

router.put('/:id', async (req,res,next)=>{
  try{
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!sale) return res.status(404).json({message:'Not found'});
    res.json(sale);
  }catch(e){ next(e); }
});

router.delete('/:id', async (req,res,next)=>{
  try{
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if(!sale) return res.status(404).json({message:'Not found'});
    res.json({ok:true});
  }catch(e){ next(e); }
});

export default { router, guard };
