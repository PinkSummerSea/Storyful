import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import {locations} from './locations.js'
import {cities} from './cities.js'
import {quotes} from './quotes.js'
import {images} from './images.js'
import postModel from '../models/postModel.js'

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log(`db connected`))
    .catch(err => console.log(err))

const seedDB = async () => {
    await postModel.deleteMany({});

    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const random101 = Math.floor(Math.random() * 101);
        const post = new postModel({
            userId: "631182e83864f739fbd81683", //summer
            username: "Summer",
            lng: locations[random10].longitude,
            lat: locations[random10].latitude, 
            location: `${locations[random10].name}, ${locations[random10].city}, ${locations[random10].province}`,
            title: quotes[random101].quote,
            image: images[i],
            desc: `<p>${quotes[random101 + 1].quote}</p><p>I'm on holiday for the UK and I am absolutely blown away by how beautiful Canada is. Banff was gorgeous! I told my mates we had to be at Moraine Lake early. Got there at 0430 and had one of the last 5 spaces, so thank you to everyone who put advice on this page. I am genuinely gobsmacked by this stunning country. And everyone is so friendly.</p><p>This is from years back, but it was on a family trip when I was 12: American tourists asking my parents why the ski lift was closed at Lake Louise. back then, it wasn't open in non-skiing season. They were carrying ski equipment and were ready to go. It was mid-July and at least 34 C that day. My parents just laughed at them, lol.</p>`
        })

        await post.save()
    }

    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const random101 = Math.floor(Math.random() * 101);
        const post = new postModel({
            userId: "631185493864f739fbd81698", //juliet
            username: "Juliet",
            lng: locations[random10].longitude,
            lat: locations[random10].latitude, 
            location: `${locations[random10].name}, ${locations[random10].city}, ${locations[random10].province}`,
            title: quotes[random101].quote,
            image: images[i+10],
            desc: `<p>${quotes[random101 + 1].quote}</p><p>I'm on holiday for the UK and I am absolutely blown away by how beautiful Canada is. Banff was gorgeous! I told my mates we had to be at Moraine Lake early. Got there at 0430 and had one of the last 5 spaces, so thank you to everyone who put advice on this page. I am genuinely gobsmacked by this stunning country. And everyone is so friendly.</p><p>This is from years back, but it was on a family trip when I was 12: American tourists asking my parents why the ski lift was closed at Lake Louise. back then, it wasn't open in non-skiing season. They were carrying ski equipment and were ready to go. It was mid-July and at least 34 C that day. My parents just laughed at them, lol.</p>`
        })

        await post.save()
    }

    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const random101 = Math.floor(Math.random() * 101);
        const post = new postModel({
            userId: "63119ff9914434a87c4bd481", //anna
            username: "Anna",
            lng: locations[random10].longitude,
            lat: locations[random10].latitude, 
            location: `${locations[random10].name}, ${locations[random10].city}, ${locations[random10].province}`,
            title: quotes[random101].quote,
            image: images[i+20],
            desc: `<p>${quotes[random101 + 1].quote}</p><p>I'm on holiday for the UK and I am absolutely blown away by how beautiful Canada is. Banff was gorgeous! I told my mates we had to be at Moraine Lake early. Got there at 0430 and had one of the last 5 spaces, so thank you to everyone who put advice on this page. I am genuinely gobsmacked by this stunning country. And everyone is so friendly.</p><p>This is from years back, but it was on a family trip when I was 12: American tourists asking my parents why the ski lift was closed at Lake Louise. back then, it wasn't open in non-skiing season. They were carrying ski equipment and were ready to go. It was mid-July and at least 34 C that day. My parents just laughed at them, lol.</p>`
        })

        await post.save()
    }

    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const random101 = Math.floor(Math.random() * 101);
        const post = new postModel({
            userId: "6318cc88106a990467fcf90c", //story
            username: "Story",
            lng: locations[random10].longitude,
            lat: locations[random10].latitude, 
            location: `${locations[random10].name}, ${locations[random10].city}, ${locations[random10].province}`,
            title: quotes[random101].quote,
            image: images[i+30],
            desc: `<p>${quotes[random101 + 1].quote}</p><p>I'm on holiday for the UK and I am absolutely blown away by how beautiful Canada is. Banff was gorgeous! I told my mates we had to be at Moraine Lake early. Got there at 0430 and had one of the last 5 spaces, so thank you to everyone who put advice on this page. I am genuinely gobsmacked by this stunning country. And everyone is so friendly.</p><p>This is from years back, but it was on a family trip when I was 12: American tourists asking my parents why the ski lift was closed at Lake Louise. back then, it wasn't open in non-skiing season. They were carrying ski equipment and were ready to go. It was mid-July and at least 34 C that day. My parents just laughed at them, lol.</p>`
        })

        await post.save()
    }

    for (let i = 0; i < 10; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const random101 = Math.floor(Math.random() * 101);
        const post = new postModel({
            userId: "6318ed74106a990467fcfb97", //adeventurer
            username: "Adventurer",
            lng: locations[random10].longitude,
            lat: locations[random10].latitude, 
            location: `${locations[random10].name}, ${locations[random10].city}, ${locations[random10].province}`,
            title: quotes[random101].quote,
            image: images[i+40],
            desc: `<p>${quotes[random101 + 1].quote}</p><p>I'm on holiday for the UK and I am absolutely blown away by how beautiful Canada is. Banff was gorgeous! I told my mates we had to be at Moraine Lake early. Got there at 0430 and had one of the last 5 spaces, so thank you to everyone who put advice on this page. I am genuinely gobsmacked by this stunning country. And everyone is so friendly.</p><p>This is from years back, but it was on a family trip when I was 12: American tourists asking my parents why the ski lift was closed at Lake Louise. back then, it wasn't open in non-skiing season. They were carrying ski equipment and were ready to go. It was mid-July and at least 34 C that day. My parents just laughed at them, lol.</p>`
        })

        await post.save()
    }
    
    for (let i = 0; i < 500; i++) {
        const random = Math.floor(Math.random() * 140603);
        const random101 = Math.floor(Math.random() * 101);
        const random50 = Math.floor(Math.random() * 50);
        const post = new postModel({
            userId: "6318ec8f106a990467fcfb3f", //Crazy Storyful Lover
            username: "Crazy Storyful Lover",
            lng: cities[random].lng,
            lat: cities[random].lat, 
            location: `${cities[random].name}, ${cities[random].country}`,
            title: quotes[random101].quote,
            image: images[random50],
            desc: `<p>${quotes[random101 + 1].quote}</p><p>I'm on holiday for the UK and I am absolutely blown away by how beautiful Canada is. Banff was gorgeous! I told my mates we had to be at Moraine Lake early. Got there at 0430 and had one of the last 5 spaces, so thank you to everyone who put advice on this page. I am genuinely gobsmacked by this stunning country. And everyone is so friendly.</p><p>This is from years back, but it was on a family trip when I was 12: American tourists asking my parents why the ski lift was closed at Lake Louise. back then, it wasn't open in non-skiing season. They were carrying ski equipment and were ready to go. It was mid-July and at least 34 C that day. My parents just laughed at them, lol.</p>`
        })

        await post.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})