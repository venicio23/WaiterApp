import path from 'node:path';
import http from 'node:http';

import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';
import { setupSwagger } from './swagger';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect("mongodb://localhost:27017/waiterapp")
  .then(() => {
    const PORT = process.env.PORT || 3000;

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    })

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    // Setup Swagger documentation
    setupSwagger(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}/`);
      console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Connecting Error:", err);
  });


