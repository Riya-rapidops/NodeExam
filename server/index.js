const express = require("express");
require('dotenv').config();
require('./startup/connection');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRotes');
const app = express();

app.use(express.json());
app.use(express.urlencoded());//decode data from html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/auth',authRoutes);
app.use('/post',postRoutes)

// listen port for server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = app;