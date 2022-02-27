const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config({ path: ".env" });

async function DB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop');
        console.log('Connection to MongoDB is successfuly');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
    }
}
DB();


app.get("/", (req, res) => {
    res.status(200).json("Router is access!");
})



const post = 3000;
app.listen(post, () => {
    console.log(`Backend server is running http://localhost:${post}`);
})
