const { expect } = require( 'chai' );

//const { models: { users } } = require( '../../db' );
const users  = require( '../../db' ).User;

describe( 'User model', () => {

  describe( 'Attributes', () => {
    const { attributes } = users;
    it( 'Has attributes as expected', () => {
      expect( attributes.name ).to.be.a( 'object' );
      expect( attributes.email ).to.be.a( 'object' );
      expect( attributes.password ).to.be.a( 'object' );
      expect( attributes.isAdmin ).to.be.a( 'object' );
    } );

    describe( 'name attribute', () => {
      const { attributes: { name } } = users;
      // console.log(users.options);
      // console.log( Object.keys( users ) ); // logs in master.... not the best :)
      it( 'Has length requirements', () => {
        expect( name.validate.len ).to.be.a( 'array' );
      } );
      notNullOrEmpty( name );
    } );

    describe( 'email attribute', () => {
      const { attributes: { email } } = users;
      it( 'Is unique', () => {
        expect( email.unique ).to.be.ok;
      } );
      it( 'Validates email', () => {
        expect( email.validate.isEmail ).to.be.ok;
      } );
      notNullOrEmpty( email );
    } );

    describe( 'password attribute', () => {
      const { attributes: { password } } = users;
      notNullOrEmpty( password );
    } );

    describe( 'isAdmin attribute', () => {
      const { attributes: { isAdmin } } = users;
      it( 'Has a default value which is false', () => {
        expect( Object.keys( isAdmin ).indexOf( 'defaultValue' ) ).to.be.above( -1 );
        expect( isAdmin.defaultValue ).to.be.eql( false );
      } );
    } );
  } );

  describe( 'Class Methods', () => {
    describe( 'findByPassword', () => {
      it( 'Exists', () => {
        expect( users.findByPassword ).to.be.ok; // this isn't really testing if the function does what we expect. Try actually using it and seeing if you get expected results (maybe you need a before to create a couple of users or something)
      } );
    } );
  } );
} );

function notNullOrEmpty( obj ) { // love that you are DRYing out your code!!
  return it( 'Doesn\'t allow empty or null values', () => {
    expect( obj.validate.notEmpty ).to.be.ok;
    expect( obj.allowNull ).to.be.eql( false );
  } );
}

