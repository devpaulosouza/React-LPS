import React from 'react';

import { Link } from 'react-router-dom';

export default () => (
  <div className="container">
    <h1>Home</h1>
    <Link to="/login">Login</Link>
  </div>
);
