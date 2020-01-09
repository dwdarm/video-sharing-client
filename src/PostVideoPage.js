import React from 'react';
import { useHistory } from "react-router-dom";
import PostVideo from './components/PostVideo';


function PostVideoPage() {
  const history = useHistory();
  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-wrapper">
          <p className="title has-text-centered">Post a video</p>
          <PostVideo history={history}/>
        </div>
      </div>
    </div>
  );
}

export default PostVideoPage;
