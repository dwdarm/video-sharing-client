import React from 'react';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import ProfileBanner from './components/ProfileBanner';
import ProfileTab from './components/ProfileTab';

function ProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const match = useRouteMatch();

  return(
    <div>
      <ProfileBanner accountId={id} location={location} match={match}/>
      <ProfileTab accountId={id} location={location} match={match}/>
    </div>
  );
}

export default ProfilePage;
