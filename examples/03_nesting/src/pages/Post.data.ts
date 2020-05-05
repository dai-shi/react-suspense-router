import { Match } from 'react-suspense-router';

export type PostData = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const fetchPostData = async (match: Match) => {
  const { postId } = match.params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const data = await response.json();
  return data as PostData;
};

export default fetchPostData;
