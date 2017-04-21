const db = require( './index' );
const chalk = require( 'chalk' );

let glasses = formatGlassesJSON( require( './jsondata/glasses-men.json', 'men' ) )
  .concat( formatGlassesJSON( require( './jsondata/glasses-women.json' ), 'women' ) );

// Finagle with the data structure
function formatGlassesJSON( arr, category ) {
  return arr.map( prod => {
      if ( !prod.price || !prod.name ) return null;
      prod.price = parseInt( prod.price.replace( /\$/g, '' ), 10 );
      prod.category = category;
      prod.description = 'lorem ipsum';
      prod.inventory = Math.floor( 100 * Math.random() );
      return prod;
    } )
    .filter( prod => prod )
    .filter( prod => prod.name );
}

const users = [
  { name: 'Arum', email: 'arum@google.com', password: '1234', isAdmin: false },
  { name: 'Richard', email: 'richard@google.com', password: '1234', isAdmin: true },
  { name: 'Evan', email: 'evan@google.com', password: '1234', isAdmin: true },
  { name: 'Alex', email: 'alex@google.com', password: '1234', isAdmin: true }
];

const reviews = [
  { rating: 1, review_text: 'aweful', product_id: 2 },
  { rating: 1, review_text: 'if you have too much extra money ', product_id: 1 },
  { rating: 2, review_text: 'don\'t buy', product_id: 2 },
  { rating: 2, review_text: 'waste of money', product_id: 3 },
  { rating: 3, review_text: 'can be better', product_id: 4 },
  { rating: 3, review_text: 'should be better', product_id: 5 },
  { rating: 4, review_text: 'good price', product_id: 4 },
  { rating: 4, review_text: 'just like description', product_id: 3 },
  { rating: 5, review_text: 'you must pick this', product_id: 1 },
  { rating: 5, review_text: 'my fav', product_id: 5 }
];


db.sync( { force: true } )
  .then( () => db.models.users.bulkCreate( users ) )
  .then( () => db.models.glasses.bulkCreate( glasses ) )
  .then( () => db.models.reviews.bulkCreate( reviews ) )
  .then( () => console.log( chalk.green.bold.inverse( `Seeded OK` ) ) )
  .catch( error => console.error( error.stack ) );

