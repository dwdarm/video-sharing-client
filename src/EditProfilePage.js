import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import EditProfileForm from'./components/EditProfileForm';

function EditProfilePage(props) {
  const { id } = useParams();
  const history = useHistory();

  return (
    <div className="wrapper">
      <div className="container">
        <div className="form-wrapper">
          <p className="title has-text-centered">Edit Profile</p>
          <EditProfileForm accountId={id} history={history}/>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
