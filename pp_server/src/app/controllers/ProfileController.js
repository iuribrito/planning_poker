import Player from '../models/Player';

class ProfileControlle {
  async show(req, res) {
    const { id } = req.params;

    const player = await Player.findById(id);
    return res.json(player);
  }

  async store(req, res) {
    const {
      name, uid, avatar, email,
    } = req.body;

    let player = await Player.findOne({ uid });

    if (!player) {
      player = await Player.create({
        name,
        email,
        avatar,
        uid,
      });
    }

    return res.json(player);
  }

  async update(req, res) {
    const { name, avatar, email } = req.body;
    const { id } = req.params;

    const player = await Player.findById(id);

    player.name = name;
    player.email = email;
    player.avatar = avatar;

    await player.save();

    return res.json(player);
  }
}

export default new ProfileControlle();
