import mongoose from 'mongoose';
import app from './app';

mongoose.connect('mongodb+srv://planning_poker:planning_poker@planning-poker-vagz8.mongodb.net/planning_poker?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3333);
