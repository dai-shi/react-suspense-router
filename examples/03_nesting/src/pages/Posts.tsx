import React from 'react';

import {
  Link,
  Routes,
  Route,
  FetchDataLazy,
} from 'react-suspense-router';

const Post = React.lazy(() => import('./Post'));
const fetchPostData = FetchDataLazy(() => import('./Post.data'));

const About: React.FC = () => (
  <div>
    <h1>Posts</h1>
    <ul>
      <li>
        <Link to="1">Post 1</Link>
      </li>
      <li>
        <Link to="2">Post 2</Link>
      </li>
      <li>
        <Link to="3">Post 3</Link>
      </li>
    </ul>

    <Routes>
      <Route path=":postId" element={<Post />} fetchData={fetchPostData} />
      <Route element={<h3>Please select a post.</h3>} />
    </Routes>
  </div>
);

export default About;
