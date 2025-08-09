import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './src/models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shahn_sales';

const products = [
  { name: 'كوب قهوة صغير',  category: 'أكواب',      size: '4 oz',  price: 0.50, printingType: 'Hot Stamping', template: 'كليشة 1' },
  { name: 'كوب قهوة وسط',   category: 'أكواب',      size: '8 oz',  price: 0.80, printingType: 'Hot Stamping', template: 'كليشة 2' },
  { name: 'كوب قهوة كبير',  category: 'أكواب',      size: '12 oz', price: 1.00, printingType: 'Embossing',    template: 'كليشة 3' },
  { name: 'علبة آيسكريم',   category: 'عبوات',      size: '500 مل', price: 5.00, printingType: 'طباعة كاملة', template: 'كليشة 4' },
  { name: 'حامل أكواب',     category: 'إكسسوارات', size: '4 حفر', price: 2.00, printingType: 'بدون',         template: 'كليشة 5' }
];

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');

    await Product.deleteMany({});
    console.log('🧹 Cleared products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products`);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
}

run();
