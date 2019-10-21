import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  uid: String,
});

export default mongoose.model('Player', PlayerSchema);
