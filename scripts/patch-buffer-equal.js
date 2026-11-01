import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'node_modules', 'buffer-equal-constant-time', 'index.js');

const patchedContent = `'use strict';
var Buffer = require('buffer').Buffer;
var SlowBuffer = require('buffer').SlowBuffer || Buffer;

module.exports = bufferEq;

function bufferEq(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  var c = 0;
  for (var i = 0; i < a.length; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}

bufferEq.install = function() {
  Buffer.prototype.equal = function equal(that) {
    return bufferEq(this, that);
  };
  if (SlowBuffer && SlowBuffer.prototype) {
    SlowBuffer.prototype.equal = Buffer.prototype.equal;
  }
};

var origBufEqual = Buffer.prototype.equal;
var origSlowBufEqual = SlowBuffer && SlowBuffer.prototype ? SlowBuffer.prototype.equal : undefined;

bufferEq.restore = function() {
  Buffer.prototype.equal = origBufEqual;
  if (SlowBuffer && SlowBuffer.prototype) {
    SlowBuffer.prototype.equal = origSlowBufEqual;
  }
};
`;

try {
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, patchedContent, 'utf8');
        console.log('[postinstall] Successfully patched buffer-equal-constant-time for Node.js 26+');
    } else {
        console.log('[postinstall] buffer-equal-constant-time not found, skipping patch.');
    }
} catch (err) {
    console.error('[postinstall] Error patching buffer-equal-constant-time:', err);
}

