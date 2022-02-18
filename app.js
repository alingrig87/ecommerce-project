import express from 'express';

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

// start the server - listen on port 3000
app.listen(3000);
