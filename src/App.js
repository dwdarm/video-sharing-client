import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { HashRouter, Route, Switch } from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import NavBar from './components/NavBar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import VideoPage from './VideoPage';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import PostVideoPage from './PostVideoPage';
import EditVideoPage from './EditVideopage';
import Error404Page from './Error404Page';

const store = configureStore();
TimeAgo.addLocale(en);

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          <HashRouter>
            <NavBar/>
            <Switch>
              <Route path="/video-edit/:id"><EditVideoPage/></Route>
              <Route path="/video/:id"><VideoPage/></Route>
              <Route path="/profile-edit/:id"><EditProfilePage/></Route>
              <Route path="/profile/:id"><ProfilePage/></Route>
              <Route path="/post-video"><PostVideoPage/></Route>
              <Route path="/login"><LoginPage/></Route>
              <Route path="/register" ><RegisterPage/></Route>
              <Route path="/404" ><Error404Page/></Route>
              <Route path="/"><HomePage/></Route>
            </Switch>
          </HashRouter>
        </Provider>
      </div>
    );
  }
  
}