import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import movieReducer from './movieReducer';
import genreReducer from './genreReducer';

const rootReducer = combineReducers({
  moviesReducer,
  movieReducer,
  genreReducer,
});

export default rootReducer;
