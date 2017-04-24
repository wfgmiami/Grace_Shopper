'use strict';

const Sequelize = require( 'sequelize' );
const conn = require( '../conn' );
const Category = require( './Category' );

const Glasses = conn.define( 'glasses', {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING
  },
  description: {
    type: conn.Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: conn.Sequelize.DECIMAL,
    allowNull: false
  },
  inventory: {
    type: conn.Sequelize.INTEGER,
    allowNull: false
  },
  images: {
    type: conn.Sequelize.ARRAY( Sequelize.STRING )
  }
}, {
  classMethods: {
    getWithCategories() {
      return this.findAll( {
        include: [ {
          model: Category,
          attributes: [ 'name', 'value' ],
          through: { attributes: [] }
        } ]
      } );
    },
    filterCategories(filterArr) {
      let incl = filterArr.map(attr => ({
        model: Category,
        attributes: [ 'name', 'value' ],
        through: { attributes: [] }
      }));
    }
  }
} );

module.exports = Glasses;


// Products

// Must have title, description, price, and inventory quantity
// Must belong to at least one category
// If there is no photo, there must be a placeholder photo used

