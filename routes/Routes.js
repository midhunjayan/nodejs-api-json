// Route.js
const express = require('express');
const router = express.Router();

const todoRoutes = require('./todo.js');

router.use(todoRoutes);
module.exports = router;
