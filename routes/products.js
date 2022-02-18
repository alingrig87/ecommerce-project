import express from 'express';
import Post from '../models/Product.js';
const router = express.Router();

router.get('/', (req, res) => res.send('Products endpoint!'));

router.post('/', (req, res) => {
	// const product = req.body;
	console.log(req.body);
});

export default router;
