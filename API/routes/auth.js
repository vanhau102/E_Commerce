const express = require('express');
const User = require('../models/User');
const router = express.Router();
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});
//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(401).json("Wrong credentials!");
            return;
        }

        const hashPassword = await CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            res.status(401).json("Wrong credentials");
            return;
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;
