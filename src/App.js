import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter } from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Router from './Router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const store = configureStore();
TimeAgo.addLocale(en);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="main-content">
            <NavBar className="is-flex-1"/>
            <div className="is-flex-1"><Router/></div>
            <Footer className="is-flex-1"/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }

}
