const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

dotenv.config({ path: ".env" });

app.use(express.json());

//Connect MongoDB 
main().catch(err => console.log("Mongodb is connect fails", err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/shop');
    console.log("Mongodb is connected");
}

//Route
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);



const post = 3000;
app.listen(post, () => {
    console.log(`Backend server is running http://localhost:${post}`);
})
