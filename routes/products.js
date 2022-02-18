import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		res.json({ message: error });
	}
});

//get product by id
router.get('/:productId', async (req, res) => {
	console.log(req.params.productId);
	try {
		const product = await Product.findById(req.params.productId);
		res.json(product);
	} catch (error) {
		res.json({ message: error });
	}
});

// add a new product
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

//delete product by id
router.delete('/:productId', async (req, res) => {
	console.log(req.params.productId);
	try {
		const removedProduct = await Product.remove({ _id: req.params.productId });
		res.json(removedProduct);
	} catch (error) {
		res.json({ message: error });
	}
});

// update a product
router.patch('/:productId', async (req, res) => {
	console.log(req.params.productId);
	try {
		const updatedProduct = await Product.updateOne(
			{ _id: req.params.productId },
			{ $set: { name: req.body.name } }
		);
		res.json(updatedProduct);
	} catch (error) {
		res.json({ message: error });
	}
});

export default router;
