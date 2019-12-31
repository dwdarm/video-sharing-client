import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import EditProfileForm from'./components/EditProfileForm';

function EditProfilePage(props) {
  const { id } = useParams();
  const history = useHistory();

  return (
    <section className="section">
      <div className="container">
        <p className="title has-text-centered">Edit Profile</p>
        <EditProfileForm accountId={id} history={history}/>
      </div>
    </section>
  );
}

export default EditProfilePage;
