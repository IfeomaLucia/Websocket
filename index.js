var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

//Handle connectiuon
io.on('connection', function (socket) {
    console.log('a user connected', socket.id);

    //Handle Chat event
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    })

    //Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
})

http.listen(4000, function () {
    console.log('Server is running at port 4000')
})