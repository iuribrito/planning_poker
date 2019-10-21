import Story from '../models/Story';

class StoryController {
  async index(req, res) {
    const { room_id } = req.params;

    const stories = await Story.find({ room: room_id });

    res.json(stories);
  }

  async store(req, res) {
    const { room_id } = req.params;
    const { name } = req.body;

    const story = await Story.create({
      name,
      start: false,
      done: false,
      room: room_id,
    });

    res.json(story);
  }

  async start(req, res) {
    const { story_id } = req.params;

    const story = await Story.findById(story_id);

    story.start = true;
    await story.save();

    req.io.emit('start', story);
    res.json(story);
  }
}

export default new StoryController();
