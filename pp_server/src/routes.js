import { Router } from 'express';

import RoomController from './app/controllers/RoomController';
import RoomPlayerController from './app/controllers/RoomPlayerController';
import ProfileController from './app/controllers/ProfileController';
import StoryController from './app/controllers/StoryController';
import StoryAnswerController from './app/controllers/StoryAnswerController';

const routes = new Router();

routes.get('/profile', ProfileController.show);
routes.post('/profile', ProfileController.store);
routes.put('/profile/:id', ProfileController.update);

routes.get('/rooms', RoomController.index);
routes.get('/rooms/:id', RoomController.show);
routes.post('/rooms', RoomController.store);
routes.put('/rooms/:id', RoomController.update);
routes.delete('/rooms/:id', RoomController.destroy);

routes.get('/rooms/:room_id/players', RoomPlayerController.index);

routes.get('/rooms/:room_id/stories', StoryController.index);
routes.post('/rooms/:room_id/stories', StoryController.store);

routes.put('/stories/:story_id/start', StoryController.start);
routes.get('/stories/:story_id/storyanswers', StoryAnswerController.index);
routes.post('/stories/:story_id/storyanswers', StoryAnswerController.store);

export default routes;
