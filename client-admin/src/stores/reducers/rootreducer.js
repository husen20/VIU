import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import genresReducer from './genresReducer';

const rootReducer = combineReducers({
  moviesReducer,
  genresReducer,
});

export default rootReducer;
