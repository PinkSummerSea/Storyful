//require('dotenv').config()
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'
import PaymentRoute from './routes/PaymentRoute.js'

const app = express()



// serve image for public

app.use(express.static('public'))
app.use('/images', express.static('images'))

// middleware

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(process.env.PORT, ()=>console.log(`db connected. server listening at port ${process.env.PORT}`)))
    .catch(err => console.log(err))

// usage of routes

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/payment', PaymentRoute)