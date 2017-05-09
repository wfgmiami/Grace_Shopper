const { expect } = require( 'chai' );

const lineitems = require( '../../db' ).LineItem;

describe( 'Lineitem model', () => {

  describe( 'Attributes', () => {
    const { attributes } = lineitems;
    it( 'Has attributes as expected', () => {
      expect( attributes.price ).to.be.a( 'object' );
      expect( attributes.date ).to.be.a( 'object' );
      expect( attributes.quantity ).to.be.a( 'object' );
    } );

    describe( 'price attribute', () => {
      const { attributes: { price } } = lineitems;
     it( 'Validates price', () => {
        expect( price.validate.min + 1 ).to.be.ok; // can you not use - `to.be.a('number')`
      } );
      notNullOrEmpty( price );
    } );


    describe( 'date attribute', () => {
      const { attributes: { date } } = lineitems;
      notNullOrEmpty( date );
    } );


    describe( 'quantity attribute', () => {
      const { attributes: { quantity } } = lineitems;
       it( 'Validates quantity', () => {
        expect( quantity.validate.min ).to.be.ok; // `to.exist` is something I like more, but both work!
      } );
      notNullOrEmpty( quantity );
    } );
  } );
} );

function notNullOrEmpty( obj ) {
  return it( 'Doesn\'t allow null values', () => {
    expect( obj.allowNull ).to.be.eql( false );
  } );
}


