import React from 'react';

import { useParams, useRouteData } from 'react-suspense-router';

import { UserData } from './User.data';

const FirstName: React.FC = React.memo(() => {
  const userData = useRouteData() as UserData;
  return (
    <div>
      <h2>First Name</h2>
      <div>{userData.data.first_name}, random={Math.random()}</div>
    </div>
  );
});

const User: React.FC = () => {
  const { uid } = useParams();
  return (
    <div>
      <h1>User</h1>
      <div>uid: {uid}, random={Math.random()}</div>
      <FirstName />
    </div>
  );
};

export default User;
