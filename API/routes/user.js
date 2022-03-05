const express = require('express');
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const router = express.Router();
const { verifyToken, verifyTokenAuthorization } = require('./verifyToken');
router.patch("/:id", verifyTokenAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
