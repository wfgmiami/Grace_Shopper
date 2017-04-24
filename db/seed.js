const db = require( './index' );
const chalk = require( 'chalk' );

const glasses = formatGlassesJSON( require( './jsondata/glasses-men.json' ), 'men' )
  .concat( formatGlassesJSON( require( './jsondata/glasses-women.json' ), 'women' ) );

const categories = require( './jsondata/glasses-men.json' )
  .concat( require( './jsondata/glasses-women.json' ) )
  .map( prod => prod.attr ) // get only the attributes
  .reduce( ( master, attr ) => master.concat( attr ), [] ) // put all attributes into one array
  .filter( attr => { // only worry about some attributes
    return attr.name === 'color' || attr.name === 'shape' || attr.name === 'ideal_face_shape' || attr.name === 'material';
  } )
  .filter( ( attr, idx, self ) => // get uniques
    self.findIndex( tst => tst.name === attr.name && tst.value === attr.value ) === idx )
  .sort( ( one, two ) => { // sort them by attribute name
    if ( one.name < two.name ) return -1;
    if ( one.name > two.name ) return 1;
    return 0;
  } );


const users = [
  { name: 'Arum', email: 'arum@google.com', password: '123', isAdmin: false },
  { name: 'Richard', email: 'richard@google.com', password: '1234', isAdmin: true },
  { name: 'Evan', email: 'evan@google.com', password: '12345', isAdmin: true },
  { name: 'Alex', email: 'alex@google.com', password: '123456', isAdmin: true }
];

const reviews = [
  { rating: 1, review_text: 'awful', product_id: 2 },
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

console.log( db.models );


db.sync( { force: true } )
  .then( () => db.models.users.bulkCreate( users ) )
  .then( () => db.models.glasses.bulkCreate( glasses ) )
  .then( () => db.models.reviews.bulkCreate( reviews ) )
  .then( () => db.models.categories.bulkCreate( categories ) )
  .then( () => console.log( chalk.green.bold.inverse( ` Seeded OK ` ) ) )
  .catch( error => console.error( error.stack ) );

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

