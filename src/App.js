import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

const store = configureStore();
TimeAgo.addLocale(en);

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <NavBar/>
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
          </BrowserRouter>
        </Provider>
      </div>
    );
  }

}
