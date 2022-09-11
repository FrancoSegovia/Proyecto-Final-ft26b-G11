const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./routes/index.js')


const app = express();
const port = process.env.PORT || 3001

//middleware
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
app.use('/', routes)


//mongoDB connection 
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error)=> console.error(error))


app.listen(port, () => console.log('Server listening on port', port))

module.exports = app;
