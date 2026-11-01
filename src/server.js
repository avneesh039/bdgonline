import buffer from 'node:buffer';
import { Buffer } from 'node:buffer';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const bufMod = require('buffer');

class SlowBufferShim extends Buffer {}
if (!buffer.SlowBuffer) buffer.SlowBuffer = SlowBufferShim;
if (!Buffer.SlowBuffer) Buffer.SlowBuffer = SlowBufferShim;
if (!bufMod.SlowBuffer) bufMod.SlowBuffer = SlowBufferShim;

import { createServer } from 'http';
import { Server } from 'socket.io';
import cronJobContronler from './controllers/cronJobContronler.js';
import socketIoController from './controllers/socketIoController.js';

const { default: app } = await import('./app.js');

const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3015;

// Init socket.io
socketIoController.sendMessageAdmin(io);

// Init cron jobs
cronJobContronler.cronJobContronler(io);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
