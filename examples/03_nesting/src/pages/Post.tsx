import React, { Suspense } from 'react';

import { useRouteData } from 'react-suspense-router';

import { PostData } from './Post.data';

const PostContent: React.FC = () => {
  const postData = useRouteData() as PostData;
  return (
    <div>
      <h2>Post Content</h2>
      <div>random={Math.random()}</div>
      <p>{postData.body}</p>
    </div>
  );
};

const Post: React.FC = () => (
  <div>
    <h1>Post</h1>
    <div>random={Math.random()}</div>
    <Suspense fallback={<div>Fetching content...</div>}>
      <PostContent />
    </Suspense>
  </div>
);

export default Post;
