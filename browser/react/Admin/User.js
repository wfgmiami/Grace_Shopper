import React from 'react';

const User = ({ user }) => {
  if (!user) return null;
  return (
    <div className="well">
      <h4>Associated User:</h4>
      <div className="row">
        <p className="col-xs-4">
          <b>ID:</b> { user.id }
        </p>
        <p className="col-xs-4">
          <b>Name:</b> { user.name }
        </p>
        <p className="col-xs-4">
          <b>Email:</b> { user.email }
        </p>
      </div>
    </div>
  );
};

export default User;
