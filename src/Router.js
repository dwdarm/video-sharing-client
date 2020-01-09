import React from 'react';
import { Route, Switch } from "react-router-dom";
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import VideoPage from './VideoPage';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import PostVideoPage from './PostVideoPage';
import EditVideoPage from './EditVideopage';

function Router(props) {
  return(
    <Switch>
      <Route path="/video/:id/update"><EditVideoPage/></Route>
      <Route path="/video/:id"><VideoPage/></Route>
      <Route path="/profile/:id/update"><EditProfilePage/></Route>
      <Route path="/profile/:id"><ProfilePage/></Route>
      <Route path="/post"><PostVideoPage/></Route>
      <Route path="/login"><LoginPage/></Route>
      <Route path="/register" ><RegisterPage/></Route>
      <Route path="/"><HomePage/></Route>
    </Switch>
  );
}

export default Router;
