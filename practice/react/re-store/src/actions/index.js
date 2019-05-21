
const booksLoaded = (newBooks) => {
  return {
    type: `BOOKS_LOADED`,
    payload: newBooks
  };
};

const booksRequester = () => {
  return {
    type: `BOOKS_REQUESTED`
  }
};

export {
  booksLoaded,
  booksRequester
};
