import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  name: String,
  start: Boolean,
  done: Boolean,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
});

export default mongoose.model('Story', StorySchema);
