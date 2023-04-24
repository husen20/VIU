const initialState = {
  movie: {},
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case 'movie/fetchSuccess':
      return {
        movie: action.payload,
      };

    default:
      return state;
  }
}
