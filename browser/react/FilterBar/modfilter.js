export const createNewFilter = ( filter, name, value ) => {
  if ( filter[ name ] ) {
    if ( filter[ name ].indexOf( value ) > -1 ) {
      filter[ name ] = filter[ name ].filter( val => val !== value );
    } else {
      filter[ name ].push( value );
    }
  } else {
    filter[ name ] = [ value ];
  }
  return filter;
};

