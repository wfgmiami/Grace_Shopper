const express = require( 'express' );
const app = express();
const db = require( '../db' );
const path = require( 'path' );
const chalk = require( 'chalk' );

// Syncing all the models at once. This promise is used by main.js.
db.sync()
  .then( () => console.log( chalk.green( 'Sequelize models synced to PostgreSQL' ) ) );

app.use( require( 'body-parser' ).json() );
app.use( '/vendor', express.static( path.join( __dirname, '..', 'node_modules' ) ) );
app.use( '/dist', express.static( path.join( __dirname, '..', 'dist' ) ) );
app.use( '/api', require( './routes' ) );


app.get( '*', ( req, res, next ) => {
  res.sendFile( path.join( __dirname, '..', 'browser/index.html' ) );
} );

const port = process.env.PORT || 3000;
app.listen( port, () => console.log( `Listening on port ${port}` ) );

//db.seed();

// Handle file not found
app.use((req, res, next) => {
  res.status(404);
  console.log(`${chalk.magenta(req.method)} ${chalk.blue(req.url)} ${chalk.red(res.status)}`);
  next();
});

// Handle internal server error
app.use((err, req, res, next) => {
  res.status(500);
  console.log(`${chalk.magenta(req.method)} ${chalk.blue(req.url)} ${chalk.red(res.status)}`);
  next(err);
});
