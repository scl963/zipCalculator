const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/zipcodes', {
    pool: {
      max: 10,
      min: 5,
      idle: 10000,
      acquire: 10000
    },
    retry: { "max": 10 },
    logging: false,
    force: false
  })

const Location = db.define('location', {
  zipcode: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.FLOAT
  },
  long: {
    type: Sequelize.FLOAT
  }
});

module.exports = {
  db,
  Location
}