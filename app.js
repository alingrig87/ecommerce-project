import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import productsRouter from './routes/products.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(bodyParser.json());

app.get('/', async (req, res) => {
	res.send('<h1>Ecommerce 17 Node JS Server</h1>');
});

app.use('/products', productsRouter);

// Connect to DataBase
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB connected!!');
	} catch (err) {
		console.log('Failed to connect to MongoDB', err);
	}
};
connectDB();

// start the server - listen on port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT);
