import { model, Schema } from 'mongoose';

export const Products = model('Products', new Schema({
  name: {String, required: true},
  description: {String, required: true},
  imagePath: {String, required: true},
  price: {Number, required: true},
  ingredients: {
    required: true,
    type: [{
      name: {String, required: true},
      icon: {String, required: true},
  }]},
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}));
