var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

var count = 0;
//Handle connectiuon
io.on('connection', function (socket) {
    count++;
    console.log(count + ' user(s) connected', socket.id);
    socket.broadcast.emit('new_user');

    //Handle Chat event
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    })

    //Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

    socket.on('not_typing', function(data){
        socket.broadcast.emit('not_typing', data);
    })

    //Handles disconnection
    socket.on('disconnect', function(data){
        count -= 1;
        console.log('User disconnected');
        io.emit('disconnect', data)
    })
})

http.listen(4000, function () {
    console.log('Server is running at port 4000')
})