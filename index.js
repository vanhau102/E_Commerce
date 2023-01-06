const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");


dotenv.config({ path: ".env" });

app.use(cors());
app.use(express.json());

//Connect MongoDB 
main().catch(err => console.log("Mongodb is connect fails", err));

async function main() {
    await mongoose.connect(`mongodb+srv://admin:${process.env.PASS_DB}@cluster0.etychyf.mongodb.net/eshop?retryWrites=true&w=majority`);
    console.log("Mongodb is connected");
}

//Route
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);


const post = 5000;
app.listen(post, () => {
    console.log(`Backend server is running http://localhost:${post}`);
})
