import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  symbol: String,
  background: String,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
});

export default mongoose.model('Card', CardSchema);
