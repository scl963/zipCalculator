const express = require('express');
const path = require('path');
const Location = require('./db').Location;
const app = express();
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8800;

console.log('Express server starting');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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

app.listen(PORT, console.log(`Server listening on port ${PORT}`));