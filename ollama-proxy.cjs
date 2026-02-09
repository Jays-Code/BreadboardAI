const net = require('net');
const crypto = require('crypto');

const REMOTE_HOST = 'host.docker.internal';

function createProxy(localPort, remotePort, name) {
    net.createServer((socket) => {
        const id = crypto.randomBytes(3).toString('hex');
        console.log(`[Proxy:${localPort}] [${id}] Connection opened (${name})`);

        const remoteSocket = net.createConnection({
            host: REMOTE_HOST,
            port: remotePort
        });

        socket.pipe(remoteSocket).pipe(socket);

        socket.on('error', (err) => {
            if (err.code !== 'ECONNRESET') {
                console.log(`[Proxy:${localPort}] [${id}] Client Error:`, err.message);
            }
        });

        remoteSocket.on('error', (err) => {
            console.log(`[Proxy:${localPort}] [${id}] Remote Error (Host):`, err.message);
        });

        socket.on('close', () => console.log(`[Proxy:${localPort}] [${id}] Connection closed (${name})`));
    }).listen(localPort, '0.0.0.0', () => {
        console.log(`[Proxy] Bridge active: 0.0.0.0:${localPort} -> ${REMOTE_HOST}:${remotePort} (${name})`);
    });
}

const bridges = [
    // { name: 'Ollama', local: 11434, target: 11434 },
    // { name: 'Qdrant REST', local: 6333, target: 7333 },
    // { name: 'Qdrant gRPC', local: 6334, target: 7334 }
];

bridges.forEach(bridge => {
    createProxy(bridge.local, bridge.target, bridge.name);
});
