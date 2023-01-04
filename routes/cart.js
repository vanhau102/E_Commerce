const express = require('express');
const { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');
const router = express.Router();
const Cart = require('../models/Cart');


//CREATE CART 
router.post('/', verifyToken, async (req, res) => {
    try {
        const newCart = await Cart.create(req.body);
        res.status(200).json(newCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE CART 
router.post('/:id', verifyTokenAuthorization, async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true })
        res.status(200).json(updateCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE CART 
router.delete('/:id', verifyTokenAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted!!")
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER CART
router.get("/find/:userId", verifyTokenAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET CART ALL 
router.get('/', verifyTokenAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;
