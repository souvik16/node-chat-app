const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname,'../public');

console.log(publicPath);
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected')


    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
    
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

    // socket.emit('newEmail',{name:'souvik@gmail.com',text:'hi'})

    // socket.on('createMail',(mailData)=>{
    //     console.log('mail created',mailData);
    // })

    // socket.emit('newMessage',{message:'new message created from server'});

    // socket.emit('newMessage',generateMessage('admin','welcome to chat app'))

    // socket.broadcast.emit('newMessage',generateMessage('admin','new user joined'))

    // socket.on('createMessage',(message,callback)=>{
    //     console.log('create message from client',message);
    //     callback('got the message');
    // })

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
})

// io.on('connection',(socket)=>{
//     console.log('new user connected')
// })

server.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
