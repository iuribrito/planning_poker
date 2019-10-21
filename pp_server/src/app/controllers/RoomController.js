import Room from '../models/Room';

class RoomController {
  async index(req, res) {
    const rooms = await Room.find();
    return res.json(rooms);
  }

  async show(req, res) {
    const { id } = req.params;

    const room = await Room.findById(id);
    return res.json(room);
  }

  async store(req, res) {
    const { name, description } = req.body;

    const room = await Room.create({
      name,
      description,
    });
    return res.json(room);
  }

  async update(req, res) {
    const { name, description } = req.body;
    const { id } = req.params;

    const room = await Room.findById(id);

    room.name = name;
    room.description = description;
    await room.save();

    return res.json(room);
  }

  async destroy(req, res) {
    const { id } = req.params;
    await Room.findByIdAndRemove(id);

    return res.send();
  }
}

export default new RoomController();
