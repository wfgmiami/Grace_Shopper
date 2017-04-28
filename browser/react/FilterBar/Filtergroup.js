import React from 'react';

const Filtergroup = ({ category, title }) => (

  <li className="list-group-item">
    <p>Filter by { title }:</p>
    { category.map((cat, idx) => (
      <p key={ idx }>
        <label>
          <input type="checkbox" /> { cat }
        </label>
      </p>
    )) }
  </li>

);

export default Filtergroup;
