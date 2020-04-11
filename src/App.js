import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter } from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Router from './Router';

const store = configureStore();
TimeAgo.addLocale(en);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </Provider>
    );
  }

}
