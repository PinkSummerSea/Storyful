//require('dotenv').config()
import * as dotenv from 'dotenv'
if(process.env.NODE_ENV !== "production") {
    dotenv.config()
};
import cors from 'cors'

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'


// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'
import PaymentRoute from './routes/PaymentRoute.js'
import * as http from 'http'
import {Server} from 'socket.io'
const app = express()
const httpServer = http.createServer(app);


// middleware

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>httpServer.listen(process.env.PORT, ()=>console.log(`db connected. server listening at port ${process.env.PORT}`)))
    .catch(err => console.log(err))

// usage of routes

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/payment', PaymentRoute)

// ============= DEPLOYMENT =======================

const __dirname1 = path.resolve()
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}

// ============= DEPLOYMENT =======================


const io = new Server(httpServer, {
    cors: {
        origin: 'https://storyful.herokuapp.com/'
    }
})

let activeUsers = []

io.on('connection', (socket) => {
    // add new user
    console.log('Connection established');
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

