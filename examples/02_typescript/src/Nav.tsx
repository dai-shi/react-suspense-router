import React from 'react';

import { Link, usePending } from 'react-suspense-router';

const Nav: React.FC = () => {
  const isPending = usePending();
  return (
    <div>
      <div style={{ position: 'absolute', top: 0 }}>{isPending && 'Pending...'}</div>
      <ul style={{ marginTop: 20 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/me">About me</Link>
        </li>
        <li>
          <Link to="/about/us">About us</Link>
        </li>
        <li>
          <Link to="/user/1">User 1</Link>
        </li>
        <li>
          <Link to="/user/2">User 2</Link>
        </li>
        <li>
          <Link to="/user/3">User 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
