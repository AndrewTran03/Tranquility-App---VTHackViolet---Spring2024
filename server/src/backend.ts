import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import log from "./utils/logger";
import router from "./routes";
import { Server } from "socket.io";
import http from "http";
import { ensureConnectionToMongoDatabase } from "./utils/mongo.connection";

// Link: https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2eed
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));
app.use(router);
app.use((_, res, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// const frontendClientPort = config.get<number>("frontendClientPort");
const frontendClientUrl = config.get<string>("frontendClientUrl");

// Socket.io Setup (Server):
// const server = http.createServer(app);
// const ioSocket = new Server(server, {
//   cors: {
//     origin: [frontendClientUrl],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"]
//   }
// });

// Tracks incoming connections to SocketIO server connection
// ioSocket.on("connection", (socket) => {
//   log.debug(`User sucessfully connected to Socket.io!\nSERVER-SIDE #ID: ${socket.id}`);

//   socket.conn.on("close", (reason) => {
//     log.debug(`A user disconnected. REASON: ${reason}`);
//   });
// });

const backendServerPort = config.get<number>("backendServerPort");
const backendServerUrl = config.get<string>("backendServerUrl");

app.listen(backendServerPort, async () => {
  log.debug(`App started on ${backendServerUrl}`);
  await ensureConnectionToMongoDatabase();
});
