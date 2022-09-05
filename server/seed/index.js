import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {locations} from './locations.js'
import postModel from '../models/postModel.js'

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log(`db connected`))
    .catch(err => console.log(err))

const seedDB = async () => {
    await postModel.deleteMany({});

    for (let i = 0; i < 20; i++) {
        const random5 = Math.floor(Math.random() * 5);
        const post = new postModel({
            userId: "631182e83864f739fbd81683",
            username: "Summer",
            lng: locations[random5].longitude,
            lat: locations[random5].latitude, 
            location: `${locations[random5].name}, ${locations[random5].city}, ${locations[random5].province}`,
            title: `My secret story ${i}`,
            image: "test.jpg",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias!"
        })

        await post.save()
    }

    const testPost = new postModel({
            userId: "631182e83864f739fbd81683",
            username: "Summer",
            lng: '-123.2045',
            lat: '49.3960',
            location: 'test location',
            title: `Test Story`,
            image: "test.jpg",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias!"
        })

    await testPost.save()

}

seedDB().then(()=>{
    mongoose.connection.close()
})