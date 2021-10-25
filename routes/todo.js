const express = require('express');
const todoRoutes = express.Router();
const fs = require('fs');

const dataPath = './data/todo.json';

// util functions

const saveTodoData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getTodoData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// reading the data
todoRoutes.get('/Todo', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

todoRoutes.post('/Todo/addTodo', (req, res) => {
  const existTodos = getTodoData();
  const newTodoId = Math.floor(100000 + Math.random() * 10);
  const result = {
    id: newTodoId,
    ...req.body,
  };
  existTodos.push(result);

  saveTodoData(existTodos);

  res.send({ success: true, msg: 'Todo data added successfully', data: result });
});

// Read - get all Totodos from the json file
todoRoutes.get('/Todo/list', (req, res) => {
  const Totodos = getTodoData();
  res.send(Totodos);
});

// Update - using Put method
todoRoutes.put('/Todo/:id', (req, res) => {
  var existTodos = getTodoData();
  fs.readFile(
    dataPath,
    'utf8',
    (err, data) => {
      const TotodoId = req.params['id'];
      existTodos[TotodoId] = req.body;

      saveTodoData(existTodos);
      res.send(`Todos with id ${TotodoId} has been updated`);
    },
    true
  );
});

//delete - using delete method
todoRoutes.delete('/Todo/delete/:id', (req, res) => {
  fs.readFile(
    dataPath,
    'utf8',
    (err, data) => {
      var existTodos = getTodoData();

      const userId = req.params['id'];

      delete existTodos[userId];
      saveTodoData(existTodos);
      res.send(`Todos with id ${userId} has been deleted`);
    },
    true
  );
});
module.exports = todoRoutes;
