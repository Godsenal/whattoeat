const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { type: String, unique: true },
  tags: Array,
});

var collectionName = 'Foods';
module.exports = mongoose.model('Foods', FoodSchema, collectionName);
