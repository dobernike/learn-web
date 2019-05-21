
const booksLoaded = (newBooks) => {
  return {
    type: `FETCH_BOOKS_SUCCESS`,
    payload: newBooks
  };
};

const booksRequester = () => {
  return {
    type: `FETCH_BOOKS_REQUEST`
  }
};

const booksError = (error) => {
  return {
    type: `FETCH_BOOKS_FAILURE`,
    payload: error
  };
};

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequester());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError));
}

export {
  fetchBooks
};
