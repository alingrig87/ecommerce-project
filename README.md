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
   mongodb+srv://alin:<password>@cluster0.f4v5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
7. The password must not be added to versioned files, so must be hidden
8. Install dotenv:
   `npm install dotenv`

9. Connect to the DB using the following code added to app.js(replace <user_name> and <password> with your credentials from mongoDB):

```javascript
// Connect to DataBase
mongoose.connect(
	'mongodb+srv://<user_name>:<password>@cluster0.f4v5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	() => console.log('Connected to DB!!')
);
```

10. Add a new ".env" file that will not be pushed to github and the following content(replace <user_name> and <password> with your credentials from mongoDB):
    `MONGODB_URI=mongodb+srv://<user_name>:<password>@cluster0.f4v5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

11. Import and use dotenv config in app.js

```javascript
import 'dotenv/config';
// Connect to DataBase
mongoose.connect(process.env.MONGODB_URI, () =>
	console.log('Connected to DB!!')
);
```
