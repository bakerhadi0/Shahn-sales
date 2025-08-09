import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import saleRoutes from './routes/sales.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shahn_sales';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI).then(()=>{
  console.log('✅ MongoDB connected');
}).catch(err=>{
  console.error('MongoDB error', err);
  process.exit(1);
});

app.get('/', (req,res)=>res.json({name:'Shahn Sales API', status:'ok'}));

app.use('/api/auth', authRoutes);
// حماية المنتجات والمبيعات بالتوكن
app.use('/api/products', saleRoutes.guard, productRoutes);
app.use('/api/sales', saleRoutes.guard, saleRoutes.router);

// خطأ عام
app.use((err, req, res, next)=>{
  console.error('Error:', err);
  res.status(err.status || 500).json({message: err.message || 'Server error'});
});

app.listen(PORT, ()=> console.log(`🚀 API on http://localhost:${PORT}`));
