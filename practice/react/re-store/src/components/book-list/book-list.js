import React, { Component } from 'react';
import { connect } from 'react-redux'
import './book-list.css';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequester, booksError } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class BookList extends Component {

  componentDidMount() {

    const {
      bookstoreService,
      booksLoaded,
      booksRequester,
      booksError } = this.props;

    booksRequester();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data))
      .catch((err) => booksError(err));
  }

  render() {
    const { books, loading, error } = this.props;

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <ErrorIndicator />
    }

    return (
      <ul className="book-list">
        {
          books.map((book) => {
            return (
              <li key={book.id}><BookListItem book={book} /></li>
            )
          })
        }
      </ul>
    );
  };
};

// Эта функция опредяляет, какие свойства
// получит компонент из Redux
const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = {
  booksLoaded,
  booksRequester,
  booksError
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
