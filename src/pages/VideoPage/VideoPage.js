import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import VideoPlayer from './VideoPlayer';
import VideoComments from './VideoComments';

function VideoPage() {
  const { id } = useParams();

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <VideoPlayer videoId={id}/>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <VideoComments videoId={id}/>
        </div>
      </section>
    </Layout>
  )
}

export default VideoPage;
