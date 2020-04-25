const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const user = {
    name: 'Sally',
    hobby: 'soccer',
  };
  // res.send('<h1>hello</h1>');
  res.send(user);
});

app.get('/', (req, res) => {
  const user = {
    name: 'Sally',
    hobby: 'soccer',
  };
  // res.send('<h1>hello</h1>');
  res.send(user);
});

app.listen(3000);
