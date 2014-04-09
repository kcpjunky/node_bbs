var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var contentTypes = {
    '.html': 'text/html',
    '.css': "text/css",
    '.js': 'application/javascript'
};
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": contentTypes});
    var output = fs.readFileSync("./index.html", "utf-8");
    res.end(output);
}).listen(8080);

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    console.log("connect");
    socket.on('C_to_S_message', function (data) {
        console.log('message client');
        io.sockets.emit("S_to_C_message", {value: data.value});
    });

    socket.on("C_to_S_broadcast", function (data) {
        console.log("broad");
        socket.broadcast.emit("S_to_C_message", {value: data.value});
    });

    socket.on("ht", function(data) {
        console.log(data.value);
        socket.broadcast.emit("bht", {value: data.value});
    });

    socket.on("disconnect", function () {
        //
    });
});
