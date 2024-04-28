const express = require('express')
const app = express()
const { createServer } = require("http");
const httpServer = createServer(app);

const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: { origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"] }
});

io.on('connection', (socket) => {
    let namei
    console.log('🧸', socket.id);
    socket.on('name', (data) => {
        console.log(data);
        namei = data
    })
    socket.on('msg', (data) => {
        console.log('🥳',socket.id, ':', data);
        socket.broadcast.emit('msg', {[namei]:data})
    })
    socket.on('disconnect', () => { console.log('🪆', socket.id); })
})


httpServer.listen(2500, () => { console.log('👏👏👏2500👏👏👏') });