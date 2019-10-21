import mongoose from 'mongoose';

const StoryAnswerSchema = new mongoose.Schema({
  name: String,
  answer: String,
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
  },
});

export default mongoose.model('StoryAnswer', StoryAnswerSchema);
