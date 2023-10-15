const dgram = require('dgram');
const readline = require('readline');

const client = dgram.createSocket('udp4');
const serverPort = 12345;

client.on('message', (msg, rinfo) => {
    console.log(`Received message from ${rinfo.address}:${rinfo.port}: ${msg}`);
    getUserInput();
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getUserInput() {
    rl.question('Type a message to send: ', (message) => {
        client.send(message, 0, message.length, serverPort, 'localhost', (err) => {
            if (err) {
                console.error('Error sending message:', err);
            }
            // No need to call getUserInput() here; it will be called after the response is received.
        });
    });
}

getUserInput(); // Start the user input loop