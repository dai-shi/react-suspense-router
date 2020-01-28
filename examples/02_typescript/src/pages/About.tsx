import React from 'react';

import { useParams } from 'react-suspense-router';

const About: React.FC = () => {
  const { name } = useParams();
  return (
    <div>
      <h1>About {name}</h1>
      <p>How are you?</p>
    </div>
  );
};

export default About;
