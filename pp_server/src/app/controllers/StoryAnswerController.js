import StoryAnswer from '../models/StoryAnswer';

class StoryAnswerController {
  async index(req, res) {
    const { story_id } = req.params;

    const answers = await StoryAnswer.find({ story: story_id }).populate('player');
    res.json(answers);
  }

  async store(req, res) {
    const { story_id } = req.params;
    const { name, player_id, answer } = req.body;

    let storyAnswer = await StoryAnswer.findOne({ story: story_id, player: player_id });

    if (!storyAnswer) {
      storyAnswer = new StoryAnswer();
    }

    storyAnswer.name = name;
    storyAnswer.answer = answer;
    storyAnswer.story = story_id;
    storyAnswer.player = player_id;

    await storyAnswer.save();

    req.io.emit('new-answer');
    res.json(storyAnswer);
  }
}

export default new StoryAnswerController();
