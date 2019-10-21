import Card from '../models/Card';

class CardController {
  async store(req, res) {
    const { room_id } = req.params;
    const { symbol, background } = req.body;

    const card = await Card.create({
      symbol,
      background,
      room: room_id,
    });

    res.json(card);
  }
}

export default new CardController();
