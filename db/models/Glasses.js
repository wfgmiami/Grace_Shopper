'use strict';

const conn = require( '../conn' );
const { Sequelize } = conn;
const Category = require( './Category' );
const Review = require( './Review' );

const Glasses = conn.define( 'glasses', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
        return imgArr.filter( img => img.slice( 0, 4 ) !== 'data' ); // how does this determine if something is a URL?
      }
    }
  }
}, {
  getterMethods: {
    reviewSummary() {
      if ( this.reviews ) { // if (this.reviews && this.reviews.length) -- then we can dry out the 2 else statements
        if ( this.reviews.length ) {
          return Math.round( this.reviews.reduce( ( total, review ) => total + review.rating, 0 ) * 10 / this.reviews.length ) / 10; // can you not display like 8.2 stars?
        } else {
          return 'Leave the first review here';
        }
      } else {
        return 'Leave the first review here';
      }
    }
  },
  scopes: { // these scopes are AMAZING!
    inStock: {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      where: { inventory: { $gt: 0 } }
    },
    outOfStock: {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      where: { inventory: 0 }
    },
    categories: {
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
      include: [ {
        model: Category,
        attributes: [ 'name', 'value' ],
        through: { attributes: [] } // is this to remove join table attributes being sent to the front?
      }, { // this object should be able to be replaced with just `Review`
        model: Review
      } ]
    }
  },
  classMethods: {
    getWithCategories( offset, categories ) { // this seems redundant to the categories scope
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

