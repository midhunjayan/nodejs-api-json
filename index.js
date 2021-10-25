const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// create our express app
const app = express();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// route
const routes = require('./routes/Routes');
app.use('/', routes);
//start server
app.listen(7000, () => {
  console.log('listeniing at port:7000');
});
