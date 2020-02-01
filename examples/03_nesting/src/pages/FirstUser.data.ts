export type FirstUserData = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    isFirstUser?: boolean;
  };
};

const fetchFirstUserData = async () => {
  const response = await fetch('https://reqres.in/api/users/1');
  const data = await response.json();
  return { ...data, isFirstUser: true } as FirstUserData;
};

export default fetchFirstUserData;
