import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', (req, res) => res.send('Products endpoint!'));

router.post('/', async (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		imageURL: req.body.imageURL,
		description: req.body.description,
	});

	// save to DB
	try {
		const savedProduct = await product.save();
		res.json(savedProduct);
	} catch (error) {
		res.json({ message: error });
	}
});

export default router;
