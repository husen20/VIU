import { MOVIES_FETCH_SUCCESS, MOVIE_FETCH_SUCCESS, GENRES_FETCH_SUCCESS } from './actionType';
const BASE_URL = 'http://localhost:3000';
export function moviesFetchSuccess(payload) {
  return {
    type: MOVIES_FETCH_SUCCESS,
    payload: payload,
  };
}

export function genresFetchSuccess(payload) {
  return {
    type: GENRES_FETCH_SUCCESS,
    payload: payload,
  };
}

export function movieFetchSuccess(payload) {
  return {
    type: MOVIE_FETCH_SUCCESS,
    payload: payload,
  };
}

export function fetchMovies(query) {
  return async function (dispatch) {
    try {
      let filter = '';

      if (query) {
        filter = query;
      } else {
        filter = '';
      }

      const res = await fetch(`${BASE_URL}/movies?filter=${filter}`);

      const data = await res.json();
      if (!res.ok) {
        throw data;
      }

      dispatch(moviesFetchSuccess(data));

      return 'success';
    } catch (error) {
      throw error;
    }
  };
}

export function fetchMovie(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/movies/${id}`);

      const data = await res.json();
      if (!res.ok) {
        throw data;
      }

      dispatch(movieFetchSuccess(data));

      return 'success';
    } catch (error) {
      throw error;
    }
  };
}

export function fetchGenre() {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/genres`);

      const data = await res.json();
      if (!res.ok) {
        throw data;
      }

      dispatch(genresFetchSuccess(data));

      return 'success';
    } catch (error) {
      throw error;
    }
  };
}
