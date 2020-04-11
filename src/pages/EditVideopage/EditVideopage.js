import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import EditVideo from './EditVideo';


function EditVideoPage() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-wrapper">
          <p className="title has-text-centered">Edit video</p>
          <EditVideo videoId={id} history={history}/>
        </div>
      </div>
    </div>
  );
}

export default EditVideoPage;
