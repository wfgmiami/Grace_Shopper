import React from 'react';

const Filtergroup = ({ category, title, catName, modFilter }) => (

  <li className="list-group-item">
    <p>Filter by { title }:</p>
    { category.map((cat, idx) => (
      <p key={ idx }>
        <label>
          <input type="checkbox" onClick={ () => modFilter( { name: catName, value: cat } ) } /> { cat }
        </label>
      </p>
    )) }
  </li>

);

export default Filtergroup;
