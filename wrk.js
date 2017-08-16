var express = require('express')
var app = express()
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/mywrk', function (err) {
    if (err) {
        console.log('error to connecet database' + err)
    }
    else {
        console.log('db connected')
    }
})
app.use(express.static(__dirname + '/public'))
var client = require('socket.io')(server);
server.listen(8080, function () {
    console.log('Server running on 8080');
});
var userSchema = mongoose.Schema({
    message: String,
});
var vUserDts = mongoose.model('users', userSchema);
//var connection = mongoose.connection;
//connection.on('error', console.error.bind(console, 'connection error:'));
//console.log(connection)
client.on('connection', function (socket) {
    sendStatus = function (s) {
        socket.emit('status', s);
    };
    socket.on('input', function (data) {
        var message = data.message;
        vUserDts.create({ message: message }, function () {
            client.emit('output', [data]);
            sendStatus({
                message: "Message sent",
                clear: true
            });
        });
    })
})

var path = require('path')
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/wrk.html'))
})
