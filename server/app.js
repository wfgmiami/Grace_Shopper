const express = require( 'express' );
const app = express();
const db = require( '../db' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const cuid = require( 'cuid' );
const session = require( 'express-session' );

module.exports = app;

const requestId = ( req, res, next ) => {
  req.requestId = cuid();
  next();
};

require('./configure/app-variables')(app);

// Syncing all the models at once. This promise is used by main.js.
db.sync()
  .then( () => console.log( chalk.green( 'Sequelize models synced to PostgreSQL' ) ) ); // right after this is the best place to do an app.listen. You are saying once my db is synced then I am ready for users to make requests. Otherwise, you might have a race condition where you are listening, getting a request, but your db hasn't synced yet. Odds are against this, but still

app.use( require( 'body-parser' ).json() );
app.use( '/vendor', express.static( path.join( __dirname, '..', 'node_modules' ) ) );
app.use( '/dist', express.static( path.join( __dirname, '..', 'dist' ) ) );
app.use( '/stylesheets', express.static( path.join( __dirname, '..', 'browser/stylesheets' ) ) );
app.use( '/api', require( './routes' ) ); // this is happening before any req.session is being attached the request object. Is that what you want?

app.use( requestId );

app.use( session( {
  secret: 'glasses', // use the secret you made in configure/app-variable.js line 4! 
  resave: false,
  saveUnitialized: false
} ) );

app.use( require( './passport.middleware.js' ) );

app.use( ( req, res, next ) => {
  req.session.counter = req.session.counter || 0;
  req.session.counter++;
  next();
} ); // Are you using this metric? If not, maybe you don't need to keep track

app.use( '/api/auth', require( './api/auth' ) );

app.get( '/github', (req, res, next) => {
  res.redirect('http://github.com/wfgmiami/Grace_Shopper');
});

app.get( '*', ( req, res, next ) => {
  res.sendFile( path.join( __dirname, '..', 'browser/index.html' ) );
} );

const port = process.env.PORT || 3000;
app.listen( port, () => console.log( `Listening on port ${port}` ) );


// Handle file not found
app.use( ( req, res, next ) => {
  res.status( 404 );
  console.log( `Status 404: ${chalk.magenta.inverse(req.method)} ${chalk.blue.inverse(req.url)}` );
  next();
} );

// Handle internal server error
app.use( ( err, req, res, next ) => {
  if (!res.headersSent) res.sendStatus( 500 ); // I would actually like to see res.sendStatus(err.status || 500) --- maybe just status(err.status || 500).send(err.message || 'Internal Server Error')
  console.log( `Status 500: ${chalk.magenta.inverse(req.method)} ${chalk.blue.inverse(req.url)}` );
  console.log( err );
} );

