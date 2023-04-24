const initialState = {
  genres: [],
};

export default function genresReducer(state = initialState, action) {
  switch (action.type) {
    case 'genres/fetchSuccess':
      return {
        genres: action.payload,
      };

    default:
      return state;
  }
}
