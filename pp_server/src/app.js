import express from 'express';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';
import routes from './routes';

import SocketConnectMiddleware from './app/middleware/SocketConnectMiddleware';

class App {
  constructor() {
    this.connectedUsers = {};

    this.app = express();
    this.server = http.Server(this.app);
    this.io = socketio(this.server);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    this.io.on('connection', async (socket) => {
      const { user_id } = socket.handshake.query;
      if (user_id) {
        this.connectedUsers[user_id] = await SocketConnectMiddleware.register(user_id, socket.id);
      }
    });

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      return next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
