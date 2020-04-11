import React from 'react';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import Layout from '../../components/Layout';
import ProfileBanner from './ProfileBanner';
import ProfileTab from './ProfileTab';

function ProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const match = useRouteMatch();

  return(
    <Layout>
      <ProfileBanner accountId={id} location={location} match={match}/>
      <section className="section">
        <div className="container">
          <ProfileTab accountId={id} location={location} match={match}/>
        </div>
      </section>
    </Layout>
  );
}

export default ProfilePage;
