const db = require('./index');

console.log(db.models);

const seedUsers = () => db.Promise.map( [
  { name: 'Arum', email: 'arum@google.com', password: '1234', isAdmin: false },
  { name: 'Richard', email: 'richard@google.com', password: '1234', isAdmin: true },
  { name: 'Evan', email: 'evan@google.com', password: '1234', isAdmin: true },
  { name: 'Alex', email: 'alex@google.com', password: '1234', isAdmin: true },

], user => db.models.users.create( user ) );

const seedProducts = () => db.Promise.map( [
  { title: 'glass1', photo_url: [], category: ['men'], price: 36, description: 'Rayban', inventory: 100 },
  { title: 'glass2', photo_url: [], category: ['women'], price: 11, description: 'Gucci', inventory: 5 },
  { title: 'glass3', photo_url: [], category: ['men'], price: 22, description: 'Prada', inventory: 64 },
  { title: 'glass4', photo_url: [], category: ['women'], price: 25, description: 'Ferragamo', inventory: 35 },
  { title: 'glass5', photo_url: [], category: ['men'], price: 41, description: 'Chanel', inventory: 22 },
], product => db.models.glasses.create( product ) );

const seedReviews = () => db.Promise.map( [
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


], review => db.models.reviews.create( review ) );


db.sync({ force: true })
  .then(() => seedUsers
 )
  .then(() => seedProducts )
  .then(()=> db.models.orders.create({}))
  .then( seedReviews )
  .then( users => console.log( `Seeded ${users.length} users OK` ) )
  .catch( error => console.error( error ) )
  // .finally( () => db.close() );

