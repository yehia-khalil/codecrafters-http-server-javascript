const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on('connect', () => {
        console.log("connect")
    })
    socket.on("ready", () => {
        console.log("ready")
    })
    socket.on('data', () => {
        console.log("HTTP/1.1 200 OK\r\n\r\n")
        socket.write('HTTP/1.1 200 OK\r\n\r\n');
        socket.end();
        server.close();
    })
    socket.on("close", () => {
        socket.end();
        server.close();
    });
});

server.listen(4221, "localhost");
