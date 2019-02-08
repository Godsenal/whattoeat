const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, unique: true },
});

TagSchema.statics.random = async function random() {
  const count = await this.count();
  const rand = Math.floor(Math.random() * count);
  const randomDoc = await this.findOne().skip(rand);
  return randomDoc;
};
const collectionName = 'Tags';
module.exports = mongoose.model('Tags', TagSchema, collectionName);
