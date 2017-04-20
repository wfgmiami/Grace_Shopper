const conn = require('./conn');

const Product = conn.define('product', {
  title: {
    type: conn.Sequelize.STRING
  },
  description: {
    type: conn.Sequelize.STRING
  },
  price: {
    type: conn.Sequelize.DECIMAL(10,2)
  },
  inventory: {
    type: conn.Sequelize.INTEGER
  },
  url: {
    type: conn.Sequelize.STRING()
  }
})

module.exports = Product;

