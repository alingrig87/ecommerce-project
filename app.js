import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import productsRouter from './routes/products.js';

const app = express();

// Middlewares
app.use('/products', productsRouter);

// Connect to DataBase
mongoose.connect(process.env.MONGODB_URI, () =>
	console.log('Connected to DB!!')
);

// start the server - listen on port 3000
app.listen(3000);
