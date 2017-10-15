import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {type: String, unique: true},
  tags: Array
});

var collectionName = 'Foods';
export default mongoose.model('Foods', FoodSchema, collectionName);