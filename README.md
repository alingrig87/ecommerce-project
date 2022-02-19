## Node JS Express Mongo DB

### Setup

1. Initialize npm project
   `npm init -y`
2. Install express package
   `npm install express`
3. Install nodemon
   `npm install nodemon`
4. Update .gitignore file to ignore node_modules
5. Add `start` script to scripts section in package.json: "start":"nodemon app.js"
6. Add "type":"module" to package.json in order to use ES6 Modules and import syntax
7. Create app.js file add the following implementation:

```javascript
import express from 'express';

const app = express();

// ROUTES
app.get('/', (req, res) => {
	res.send('Hello first NodeJS Route');
});

app.get('/products', (req, res) => {
	res.send('Products endoint!!');
});

// start the server - listen on port 3000
app.listen(3000);
```

8. Open a browser and go to [localhost:3000](http://localhost:3000)

### Middleware

Middleware - a function that will be executed when a route is hit

```javascript
// Middlewares
app.use('/products', () => {
	console.log('Middleware example');
});
// a specific logic can be added when /products route is used
```

### Connect to Data Base (MongoDB)

1. Install mongoose
   `npm install mongoose`
2. Create a new account on [Mongo DB Atlas](https://www.mongodb.com/)
3. Create a new "products" DB
4. Go to Database Access and create new user and password the DB
5. Go to Network Access and setup up the IP rules(0.0.0.0/0 recommended)
6. Go to Database -> Connection -> Application add copy paste the mongoURI connection url
   mongodb+srv://alin:<password>@cluster0.f4v5k.mongodb.net/products?retryWrites=true&w=majority
7. The password must not be added to versioned files, so must be hidden
8. Install dotenv:
   `npm install dotenv`

9. Connect to the DB using the following code added to app.js(replace <user_name> and <password> with your credentials from mongoDB):

```javascript
// Connect to DataBase
mongoose.connect(
	'mongodb+srv://<user_name>:<password>@cluster0.f4v5k.mongodb.net/products_db?retryWrites=true&w=majority',
	() => console.log('Connected to DB!!')
);
```

10. Add a new ".env" file that will not be pushed to github and the following content(replace <user_name> and <password> with your credentials from mongoDB):
    `MONGODB_URI=mongodb+srv://<user_name>:<password>@cluster0.f4v5k.mongodb.net/products_db?retryWrites=true&w=majority`

11. Import and use dotenv config in app.js

```javascript
import 'dotenv/config';
// Connect to DataBase
mongoose.connect(process.env.MONGODB_URI, () =>
	console.log('Connected to DB!!')
);
```

### Create Routes

1. Create new "routes" folder
2. Create new "products.js" file in routes folder
3. Add the following code to "products.js" fils:

```javascript
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('Products endpoint!'));

export default router;
```

4. In "app.js" import the productsRouter (for default exports we can use an alias directly without using "as" syntax)

```javascript
import productsRouter from './routes/products.js';
```

5. Remove previously added routes from app.js and use the imported version as middleware:

```javascript
// Middlewares
app.use('/products', productsRouter);
```

### Create ProductsSchema

Describe how the the Products will look in Mongo DB

1. Create models/Posts.js file and add:

```javascript
import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Product', ProductSchema);
```

2. Install body parser
   `npm install body-parser`

3. Import and use body-parser in app.js

```javascript
import bodyParser from 'body-parser';
app.use(bodyParser.json());
```

4. Create a POST route using the created model in routes/product.js

```javascript
import Post from '../models/Product.js';

router.post('/', (req, res) => {
	console.log(req.body);
});
```

### Add the POST route

```javascript
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
```

Tip: for solving timeout error add async await connection to MongoDB:

```javascript
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
```

[Timeout error - details](https://dev.to/arunkc/solve-mongooseerror-operation-x-find-buffering-timed-out-after-10000ms-3d3j)

### Add Patch by ID, Delete by ID routes

```javascript
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
```

### Deploy on Heroku

`const PORT = process.env.PORT || 3000;`

- create new app in heroku
- link the github repo
- configure MONGODB_URI env variable on Heroku
- The app is up and running -> [here](https://ecommerce17-server.herokuapp.com/)

### CORS disabled for requests from localhost

The the following code before using the routes:

```javascript
// solve CORS issues for localhost requests
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
	);
	next();
});
```
