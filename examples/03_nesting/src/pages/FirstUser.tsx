import React from 'react';

import { useRouteData } from 'react-suspense-router';

import { FirstUserData } from './FirstUser.data';

const FirstUser: React.FC = () => {
  const userData = useRouteData() as FirstUserData;
  return (
    <div>
      <h1>First User</h1>
      <div>random={Math.random()}</div>
      <h2>First Name</h2>
      <div>{userData.data.first_name}</div>
      <div>{userData.data.isFirstUser && 'This is User 1'}</div>
    </div>
  );
};

export default FirstUser;
