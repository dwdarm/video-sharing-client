import { combineReducers } from 'redux';
import home from './home.store';
import auth from './auth.store';
import video from './video.store';
import profile from './profile.store';

export default combineReducers({
  auth: auth.reducer,
  home: home.reducer,
  video: video.reducer,
  profile: profile.reducer
});