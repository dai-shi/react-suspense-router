import React from 'react';

import {
  useRouteMatch,
  Link,
  Switch,
  Route,
  LazyFetcher,
} from 'react-suspense-router';

const Post = React.lazy(() => import('./Post'));
const fetchPostData = LazyFetcher(() => import('./Post.data'));

const About: React.FC = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        <li>
          <Link to={`${url}/1`}>Post 1</Link>
        </li>
        <li>
          <Link to={`${url}/2`}>Post 2</Link>
        </li>
        <li>
          <Link to={`${url}/3`}>Post 3</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a post.</h3>
        </Route>
        <Route path={`${path}/:postId`} fetchData={fetchPostData}>
          <Post />
        </Route>
      </Switch>
    </div>
  );
};

export default About;
