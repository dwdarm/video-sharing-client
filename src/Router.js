import React from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';
import PostVideoPage from './pages/PostVideoPage';
import EditVideoPage from './pages/EditVideopage';

function Router() {
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
