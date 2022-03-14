const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyTokenAdmin } = require('./verifyToken');

// CREATE PRODUCT
router.post('/create', verifyTokenAdmin, async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});
//UPDATE PRODUCT
router.patch("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {
            new: true,
        });
        res.status(200).json(updateProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});
//PRODUCT DELETE
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET ALL PRODUCT
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
