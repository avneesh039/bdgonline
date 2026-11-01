import buffer from 'node:buffer';
import { Buffer } from 'node:buffer';
import { createRequire } from 'node:module';
import 'ejs';

const require = createRequire(import.meta.url);
const bufMod = require('buffer');

class SlowBufferShim extends Buffer {}
if (!buffer.SlowBuffer) buffer.SlowBuffer = SlowBufferShim;
if (!Buffer.SlowBuffer) Buffer.SlowBuffer = SlowBufferShim;
if (!bufMod.SlowBuffer) bufMod.SlowBuffer = SlowBufferShim;

const { default: app } = await import('../src/app.js');

export default function handler(req, res) {
    return app(req, res);
}
