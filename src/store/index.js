import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './rootReducers';

export default function configureStore(preloadedState) {
  return createStore(
    reducer, 
    preloadedState, 
    applyMiddleware(thunkMiddleware)
  );
}