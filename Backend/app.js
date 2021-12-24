const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const managerRouter = require('./routes/manager');
const clubRouter = require('./routes/club');

//connecting to database
mongoose.connect('mongodb://localhost:27017/OnePiece', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected successfully to MongoDB !'))
  .catch(() => console.log('Connection failed to MongoDB !'));

app.use(bodyParser.json());


// CORS Middleware
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/home',homeRouter);
app.use('/api/manager',managerRouter);

app.use('/api/club',clubRouter);
module.exports = app;