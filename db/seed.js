const models = require( './index' );
const chalk = require( 'chalk' );
const db = require( './conn' );


console.log( chalk.magenta( ' Formatting data ' ) );

const glasses = formatGlassesJSON( require( './jsondata/glasses-men.json' ), 'Men' )
  .concat( formatGlassesJSON( require( './jsondata/glasses-women.json' ), 'Women' ) );
const categories = generateCategories();
const glassesCategories = generateGlassesCategories( glasses );

const users = require( './jsondata/users' );

db.sync( { force: true } )
  .then( () => console.log( chalk.yellow( ' Beginning seed ' ) ) )
  .then( () => Promise.all( users.map( user => db.models.users.create( user ) ) ) )
  .then( () => db.models.glasses.bulkCreate( glasses ) )
  .then( () => db.models.reviews.bulkCreate( createReviews( glasses ) ) )
  .then( () => db.models.categories.bulkCreate( categories ) )
  .then( () => db.models.glassesCategory.bulkCreate( glassesCategories ) )
  .then( () => db.models.lineitems.create( { orderId: 1, glassId: 1, date: new Date(), price: 210, quantity: 1 } ) )
  .then( () => db.models.lineitems.create( { orderId: 2, glassId: 45, date: new Date(), price: 109, quantity: 1 } ) )
  .then( () => db.models.payments.bulkCreate( require( './jsondata/payments' ) ) )
  .then( () => Promise.all( [
    db.models.orders.findById( 1 ),
    db.models.payments.findById( 1 )
  ] ) )
  .then( ( [ order, payment ] ) => order.setPayment( payment ) )
  .then( order => {
    order.shippingAddress = '23fkmfs';
    return order.save();
  })
  .then( () => console.log( chalk.green.bold.inverse( ` Seeded OK ` ) ) )
  .catch( error => console.error( error.stack ) );

// ---------- Reformatting Data below, nothing to see, keep calm and carry on ----------

// Finagle with the data structure
function formatGlassesJSON( arr, category ) {
  return arr.map( prod => {
    if ( !prod.price || !prod.name ) return null;
    prod.price = parseInt( prod.price.replace( /\$/g, '' ), 10 );
    prod.category = category;
    prod.description = 'lorem ipsum';
    prod.inventory = Math.floor( 100 * Math.random() );
    return prod;
  } );
}

function createReviews( products ) {
  const options = require( './jsondata/reviews' );
  const reviews = [];
  products.map( ( product, idx ) => {
    for ( let userId = 1; userId < 5; userId++ ) {
      let review = Object.assign( {}, options[ Math.floor( Math.random() * options.length ) ] );
      review.glassId = idx + 1;
      review.userId = userId;
      reviews.push( review );
    }
  } );
  return reviews;
}

function generateCategories() {
  return require( './jsondata/glasses-men.json' )
    .concat( require( './jsondata/glasses-women.json' ) )
    .map( prod => {
      prod.attr.push( { name: 'gender', value: prod.category } );
      delete prod.category;
      return prod.attr;
    } ) // get only the attributes

  .reduce( ( master, attr ) => master.concat( attr ), [] ) // put all attributes into one array

  .filter( attr => { // only worry about some attributes
    return attr.name === 'color' || attr.name === 'shape' || attr.name === 'ideal_face_shape' || attr.name === 'material' || attr.name === 'gender';
  } )

  .filter( ( attr, idx, self ) => // get uniques
    self.findIndex( tst => tst.name === attr.name && tst.value === attr.value ) === idx )

  .sort( ( one, two ) => { // sort uniques by attribute name
    if ( one.name < two.name ) return -1;
    if ( one.name > two.name ) return 1;
    return 0;
  } );
}

function generateGlassesCategories( _glasses ) {
  let _glassesCategories = [];

  _glasses.forEach( ( gls, idx ) => {
    gls.attr.map( atr => {
      let catId = categories.findIndex( tst => tst.name === atr.name && tst.value === atr.value );
      _glassesCategories.push( { glassId: idx + 1, categoryId: catId + 1 } );
    } );

  } );
  return _glassesCategories;
}

// below is used in heroku deployment
// const seed = () => {
//   return db.sync( { force: true } )
//   .then( () => console.log( chalk.yellow( ' Beginning seed ' ) ) )
//   .then( () => Promise.all( users.map( user => db.models.users.create( user ) ) ) )
//   .then( () => db.models.glasses.bulkCreate( glasses ) )
//   .then( () => db.models.reviews.bulkCreate( createReviews( glasses ) ) )
//   .then( () => db.models.categories.bulkCreate( categories ) )
//   .then( () => db.models.glassesCategory.bulkCreate( glassesCategories ) )
//   .then( () => db.models.lineitems.create( { orderId: 1, glassId: 1, date: new Date(), price: 210, quantity: 1 } ) )
//   .then( () => db.models.lineitems.create( { orderId: 2, glassId: 45, date: new Date(), price: 109, quantity: 1 } ) )
//   .then( () => console.log( chalk.green.bold.inverse( ` Seeded OK ` ) ) )
//   .catch( error => console.error( error.stack ) );
// }

// module.exports = seed;

