const dgram = require('dgram');
const queryChatGPT = require('./query');

const server = dgram.createSocket('udp4');
const port = 12345;

server.on('message', (msg, rinfo) => {
    console.log(`Received message from ${rinfo.address}:${rinfo.port}: ${msg}`);

    //prompt chat gpt

    (async() => {
        const prompt = msg.toString();
        const { answer, timeTaken } = await queryChatGPT(prompt);
        console.log('Time taken:', timeTaken);
        const response = answer;

        server.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
            if (err) {
                console.error('Error sending response:', err);
            }
        });

    })();

    // Send a response back to the client

});

server.bind(port);