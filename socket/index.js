const io = require('socket.io')(8800, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let activeUsers = []

io.on('connection', (socket) => {
    // add new user

    socket.on('new-user-add', (newUserId) => {
        if(!activeUsers.some((user) =>  user.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log('One user connected, current active users are: ', activeUsers)
        io.emit('get-users', activeUsers)
    })

    socket.on('send-message', (data) => {
        const {receiverId} = data
        const user = activeUsers.find(u => u.userId===receiverId)
        if(user){
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    socket.on('disconnect', ()=> {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log('One user disconnected. Remaining active users: ', activeUsers)
        io.emit('get-users', activeUsers)
    })
})