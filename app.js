import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

// Middlewares
app.use('/products', () => {
	console.log('Middleware example');
});

// ROUTES
app.get('/', (req, res) => {
	res.send('Hello first NodeJS Route');
});

app.get('/products', (req, res) => {
	res.send('Products endoint!!');
});

// Connect to DataBase
mongoose.connect(process.env.MONGODB_URI, () =>
	console.log('Connected to DB!!')
);

// start the server - listen on port 3000
app.listen(3000);
