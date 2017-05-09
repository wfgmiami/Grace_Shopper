export const pgStartEnd = ( offset, count ) => {
  let start = 1;
  let end = 10;
  const maxPossible = Math.ceil( count / 15 );

  if ( offset >= 10 ) {
    start = offset - 5;
    end = offset + 5;

    if ( offset > ( maxPossible - 10 ) || offset === maxPossible ) {
      start = maxPossible - 10;
      end = maxPossible;
    }

  }

  if (maxPossible < 10) {
    end = maxPossible;
  }

  return { start, end };
};

