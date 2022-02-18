import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import productsRouter from './routes/products.js';

const app = express();

// Middlewares
app.use(bodyParser.json());

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
app.listen(3000);
