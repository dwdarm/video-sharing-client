import { combineReducers } from 'redux';
import auth from './reducers/auth';
import { videos, home } from './reducers/videos';
import comments from './reducers/comments';
import accounts from './reducers/accounts';

export default combineReducers({
  auth,
  videos,
  home,
  accounts,
  comments
});