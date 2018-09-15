var express = require('express');
var socket = require('socket.io');

//Server setup
var app = express();

var server = require('http').Server(app);

//Static files
app.use(express.static('public'))

//Socket setup
var io = socket(server);
io.on('connection', function(socket){
    console.log('Made socket connection');
})

app.listen(4000, function(){
    console.log('Server is running at port 4000')
})