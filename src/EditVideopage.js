import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import EditVideo from './components/EditVideo';


function EditVideoPage() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <section className="section">
      <div className="container">
        <p className="title has-text-centered">Edit video</p>
        <EditVideo videoId={id} history={history}/>
      </div>
    </section>
  );
}

export default EditVideoPage;
