import { match as Match } from 'react-suspense-router';

export type UserData = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
};

const fetchUserData = async (match: Match<{ uid?: string }>) => {
  const userId = match.params.uid;
  const response = await fetch(`https://reqres.in/api/users/${userId}`);
  const data = await response.json();
  return data as UserData;
};

export default fetchUserData;
