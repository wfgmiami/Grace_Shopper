'use strict';

const conn = require( '../conn' );
const { Sequelize } = conn;
const Category = require( './Category' );

const Glasses = conn.define( 'glasses', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  images: {
    type: Sequelize.ARRAY( Sequelize.STRING ),
    validate: {
      containsURLs( imgArr ) {
        return imgArr.filter( img => img.slice( 0, 4 ) !== 'data' );
      }
    }
  }
}, {
  scopes: {
    inStock: {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      inventory: { $gt: 0 }
    },
    outOfStock: {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      inventory: 0
    },
    categories: {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [ {
        model: Category,
        attributes: [ 'name', 'value' ],
        through: { attributes: [] }
      } ]
    }
  },
  classMethods: {
    getWithCategories( offset, categories ) {
      return this.findAll( {
        // offset,
        // limit: 15,
        include: Object.keys( categories ).map( attr => ( {
          model: Category,
          attributes: [ 'name', 'value' ],
          where: {
            name: attr,
            value: {
              $or: Array.isArray( categories[ attr ] ) ? categories[ attr ] : [ categories[ attr ] ]
            }
          },
          through: { attributes: [] },
          as: attr
        } ) )
      } );
    }
  }
} );

module.exports = Glasses;


// Products

// Must have title, description, price, and inventory quantity
// Must belong to at least one category
// If there is no photo, there must be a placeholder photo used

