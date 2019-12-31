import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import VideoComments from './components/VideoComments';

function VideoPage() {
  const { id } = useParams();

  return (
    <div>
      <VideoPlayer videoId={id}/>
      <VideoComments videoId={id}/>
    </div>
  )
}

export default VideoPage;
