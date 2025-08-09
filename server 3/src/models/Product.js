import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {type:String, required:true},
  category: {type:String},
  size: {type:String},
  price: {type:Number, required:true, min:0},
  printingType: {type:String},
  template: {type:String}
}, {timestamps:true});

export default mongoose.model('Product', productSchema);
