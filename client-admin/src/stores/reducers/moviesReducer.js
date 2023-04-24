const initialState = {
  movies: [],
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case 'movies/fetchSuccess':
      return {
        movies: action.payload,
      };

    default:
      return state;
  }
}
