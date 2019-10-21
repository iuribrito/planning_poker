import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.model('Room', RoomSchema);
