const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/money_tracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema and model
const transactionSchema = new mongoose.Schema({
    type: String,
    description: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.use(express.json());

// Serve static files
app.use(express.static('public'));

// API endpoint to get transactions
app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});
