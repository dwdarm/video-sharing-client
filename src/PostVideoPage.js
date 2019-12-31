import React from 'react';
import { useHistory } from "react-router-dom";
import PostVideo from './components/PostVideo';


function PostVideoPage() {
  const history = useHistory();
  return (
    <section className="section">
      <div className="container">
        <p className="title has-text-centered">Post a video</p>
        <PostVideo history={history}/>
      </div>
    </section>
  );
}

export default PostVideoPage;
