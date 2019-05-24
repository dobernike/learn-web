
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

export const bookAddedToCart = (bookId) => {
  return {
    type: `BOOK_ADDED_TO_CART`,
    payload: bookId
  };
};

export const bookRemoveFromCart = (bookId) => {
  return {
    type: `BOOK_REMOVE_FROM_CART`,
    payload: bookId
  };
};

export const allBooksRemoveFromCart = (bookId) => {
  return {
    type: `ALL_BOOKS_REMOVE_FROM_CART`,
    payload: bookId
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
