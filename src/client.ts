import * as net from 'net';
import {argv} from 'process';

/**
 * Clase Client
 */
class Client {
  /**
   * Método para crear el cliente y enviar el comando al servidor
   * @param {number} port
   */
  constructor(private port: number) {
    const client = net.connect({port: 60301});

    client.on('data', (dataJSON) => {
      const message = JSON.parse(dataJSON.toString());
      if (message.type === 'response') {
        console.log('Ejecución del comando\n---------------');
        console.log(`${message.response}`);
        client.end();
      } else if (message.type === 'error') {
        console.log('Error\n---------------');
        console.log(`${message.response}`);
        client.end();
      }
    });

    const comandoString: string = argv[2];

    let i: number = 3;
    const parametros: string[] = [];
    while (typeof(argv[i]) != 'undefined') {
      parametros.push(argv[i]);
      i++;
    }

    client.write(`{"type": "command", "command": "${comandoString}", "parameters": "${parametros}"}`);
  }
}

new Client(60301);
