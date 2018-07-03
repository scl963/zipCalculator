const express = require('express');
const path = require('path');
const Location = require('./db').Location;
const app = express();
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const bodyParser = require('body-parser');

console.log('Express server starting');

app.listen(8800, console.log('Server listening on port 8800'));

app.get('/api/:zipcode', function (req, res, next) {
  Location.find({
    where: {
      zipcode: {
        [op.eq]: req.params.zipcode
      }
    }
  })
    .then(data => res.json(data))
    .catch(next)
})


app.use(function (err, req, res, next) {
  console.error(err, typeof next);
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});