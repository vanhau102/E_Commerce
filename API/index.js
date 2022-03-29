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
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);



const post = 3000;
app.listen(post, () => {
    console.log(`Backend server is running http://localhost:${post}`);
})
