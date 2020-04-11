import React from 'react';
import { useHistory } from "react-router-dom";
import PostVideo from './PostVideo';
import Layout from '../../components/Layout';

function PostVideoPage() {
  const history = useHistory();
  return (
    <Layout>
      <div className="section">
        <div className="container">
          <div className="form-wrapper">
            <p className="title has-text-centered">Post a video</p>
            <PostVideo history={history}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PostVideoPage;
