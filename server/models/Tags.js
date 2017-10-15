import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: String
});

var collectionName = 'Tags';
export default mongoose.model('Tags', TagSchema, collectionName);