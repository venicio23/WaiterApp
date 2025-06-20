import { model, Schema } from 'mongoose';

export const Category = model('Category', new Schema({
  name: {String, required: true},
  icon: {String, required: true},
}));

