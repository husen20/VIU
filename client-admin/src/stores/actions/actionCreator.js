import { GENRES_FETCH_SUCCESS, MOVIES_FETCH_SUCCESS } from './actionType';
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

export function login(user) {
  return async () => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (!res.ok) {
        // eslint-disable-next-line
        throw { message: data.message };
      }

      return data;
    } catch (error) {
      throw error;
    }
  };
}

export function addMovie(formMovies, casts) {
  return async () => {
    try {
      const res = await fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({ formMovies: formMovies, casts: casts }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return 'success';
    } catch (error) {
      throw error;
    }
  };
}

export function movieEdit(formMovies, casts) {
  return async () => {
    try {
      const res = await fetch(`${BASE_URL}/movies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({ formMovies: formMovies, casts: casts }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return 'succes';
    } catch (error) {
      throw error;
    }
  };
}

export function fetchMovies() {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/movies-list`, {
        method: 'GET',
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      dispatch(moviesFetchSuccess(data));

      return 'Success';
    } catch (error) {
      throw error;
    }
  };
}

export function fetchGenres() {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/genres`, {
        method: 'GET',
        headers: {
          access_token: localStorage.access_token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      dispatch(genresFetchSuccess(data));

      return 'Success';
    } catch (error) {
      throw error;
    }
  };
}

export function deleteMovie(id) {
  return async function () {
    try {
      const res = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return 'Success';
    } catch (error) {
      throw error;
    }
  };
}

export function addGenre(genre) {
  return async () => {
    try {
      console.log(genre);
      const res = await fetch(`${BASE_URL}/genres`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(genre),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return 'success';
    } catch (error) {
      throw error;
    }
  };
}

export function editGenre(genre) {
  return async () => {
    try {
      console.log(genre);
      const res = await fetch(`${BASE_URL}/genres/${genre.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(genre),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return 'success';
    } catch (error) {
      throw error;
    }
  };
}

export function deleteGenre(id) {
  return async function () {
    try {
      const res = await fetch(`${BASE_URL}/genres/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return 'Success';
    } catch (error) {
      throw error;
    }
  };
}

export function register(user) {
  return async () => {
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        throw data;
      }

      return 'success';
    } catch (error) {
      throw error;
    }
  };
}
