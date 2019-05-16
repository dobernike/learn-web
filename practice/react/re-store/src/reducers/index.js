
const initialState = {
  books: [
    {
      id: 1,
      title: `JavaScript: The Good Parts`,
      author: `Douglas Crockford`
    },
    {
      id: 2,
      title: `You Don’t Know JS`,
      author: `Kyle Simpson`
    }
  ]
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case `BOOKS_LOADED`:
      return {
        books: action.payload
      };

      default:
      return state;
  }
};

export default reducer;
