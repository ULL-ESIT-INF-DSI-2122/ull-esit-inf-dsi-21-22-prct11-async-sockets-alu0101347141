import * as net from 'net';
import {spawn} from 'child_process';

/**
 * Clase Server
 */
class Server {
  /**
   * Método para crear el servidor y ejecutar el comando obtenido
   * @param {number} port
   */
  constructor(private port: number) {
    net.createServer((connection) => {
      console.log('A client has connected.');

      connection.on('data', (dataJSON) => {
        const message = JSON.parse(dataJSON.toString());
        if (message.type === 'command') {
          const c = spawn(message.command, message.parameters.split());
          c.on('error', (err) => {
            connection.write(`{"type": "error", "response": "${err.message}"}`);
          });
          let output = '';
          c.stdout.on('data', (chunk) => {
            output += chunk.toString();
          });
          c.on('close', () => {
            connection.write(`{"type": "response", "response": "${output}"}`);
          });
        }
      });

      connection.on('close', () => {
        console.log('A client has disconnected.');
      });
    }).listen(port, () => {
      console.log('Waiting for clients to connect.');
    });
  }
}

new Server(60301);
