const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectDB = require('./db');
const Product = require('./models/product/product');
const User = require('./models/user/user');
require('dotenv').config();

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

app.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword})
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Server error while registering user'})
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error while logging in' });
    }
});

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

app.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Access to protected route granted' });
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