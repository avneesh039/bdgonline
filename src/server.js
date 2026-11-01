import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cronJobContronler from './controllers/cronJobContronler.js';
import socketIoController from './controllers/socketIoController.js';

const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3015;

// Cron game periodic jobs
cronJobContronler.cronJobGame1p(io);

// WebSocket event handlers
socketIoController.sendMessageAdmin(io);

server.listen(port, () => {
    console.log("Connected success port: " + port);
});

export default app;
