
class RoomPlayerController {
  async index(req, res) {
    const users = req.connectedUsers;
    return res.json(users);
  }
}

export default new RoomPlayerController();
