import mongoose from 'mongoose';
const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type:Number, required:true, min:1 },
  total: { type:Number, required:true, min:0 },
  note: { type:String },
  date: { type: Date, default: Date.now }
}, {timestamps:true});
export default mongoose.model('Sale', saleSchema);
