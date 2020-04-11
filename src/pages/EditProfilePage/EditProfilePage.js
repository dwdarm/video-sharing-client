import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import EditProfileForm from'./EditProfileForm';
import Layout from '../../components/Layout';

function EditProfilePage(props) {
  const { id } = useParams();
  const history = useHistory();

  return (
    <Layout>
      <div className="section">
        <div className="container">
          <div className="form-wrapper">
            <p className="title has-text-centered">Edit Profile</p>
            <EditProfileForm accountId={id} history={history}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditProfilePage;
