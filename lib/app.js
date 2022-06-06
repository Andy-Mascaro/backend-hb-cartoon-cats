const express = require('express');
const path = require('path');
const app = express();
const { cats } = require('../data/cats');

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes

// app.use('/cats', require('./controllers/cats'));
app.use('/cats/:id', (req, res) => {
  const { id } = req.params;
  const catInfo = cats.find((info) => info.id === id);
  res.json(catInfo);
});
app.use('/', (req, res) => {
  const catList = cats.map((info) => {
    return {
      id: info.id,
      name: info.name,
    };
  });
  res.json(catList);
});

// Error handling & 404 middleware for when
// a request doesn't match any app routes

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
