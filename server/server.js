const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Product = require('./models/product/product');


const app = express();

app.use(cors());

app.use(express.json());

connectDB();


// GET METHOD
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error while fetching products' });
    }
});

// POST METHOD
app.post('/product', async (req, res) => {
    const { productName, quantity, productType } = req.body;

    try {
        const newProduct = new Product({
            productName,
            quantity,
            productType
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', data: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error while adding product' });
    }
});

// DELETE METHOD
app.delete('/product/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        console.error('Error deletin product: ', error);
        res.status(500).json({message: 'Server error while deleting product'});
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server running on PORT: ' + PORT)
})