const Sequelize = require('sequelize');

const sequelize = new Sequelize('cars', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

const Cars = sequelize.define('cars', {
  model: Sequelize.STRING,
  price: Sequelize.INTEGER,
  phone: Sequelize.STRING,
  maxPictures: Sequelize.INTEGER,
  imageUrls: Sequelize.ARRAY(Sequelize.STRING),
});

Cars.belongsTo(User);

module.exports = { sequelize, User, Cars };
