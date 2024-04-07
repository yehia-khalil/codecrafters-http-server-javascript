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
    socket.on('data', (data) => {
        let [request, host, userAgent, accept] = data.toString().split("\r\n");
        let path = request.split(" ")[1];
        let route = path.split("/");
        switch (route[1]) {
            case "":
                socket.write('HTTP/1.1 200 OK\r\n\r\n');
                socket.end();
                server.close();
                break;
            case "echo":
                socket.write('HTTP/1.1 200 OK\r\n');
                socket.write('Content-Type: text/plain\r\n');
                socket.write(`Content-Length: ${route[2]?.length ?? 0}\r\n\r\n`);
                socket.write(`${route[2] ? route[2] : ''} \r\n\r\n`);
                socket.end();
                server.close();
                break;
            default:
                socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
                socket.end();
                server.close();

        }
    })
    socket.on("close", () => {
        socket.end();
        server.close();
    });
});

server.listen(4221, "localhost");
