import React from 'react';

const Filtergroup = ({ category, title, catName, modFilter, filter }) => (
  <li className="list-group-item" style={{ border: 0 }}>
    <div className="panel-footer">
      <i>Filter by { title + ' ' }</i>
      <span className="badge badge-default pull-right">{ filter[catName] ? filter[catName].length : 0 }</span>
    </div>
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
