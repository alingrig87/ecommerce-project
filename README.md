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
