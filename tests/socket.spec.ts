import 'mocha';
import {expect} from 'chai';
import * as net from 'net';


describe('Socket', () => {
  it('Debe enviar un mensaje', (done) => {
    const client = net.connect({port: 60301});

    client.on('data', (message) => {
      expect(message).to.be.eql({'type': 'command', 'command': 'cat', 'parameters': []});
      done();
    });
    client.emit('data', `{"type": "command", "command": "cat", "parameters": ${[]}}`);
  });
});
