const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connect', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    })

})


server.listen(3000, () => console.log("Server is running on port :3000"));