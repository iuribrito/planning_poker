import Player from '../models/Player';

export default {
  register: async (user_id, socket_id) => {
    const player = await Player.findById(user_id);
    return ({ player, socket_id });
  },
};
