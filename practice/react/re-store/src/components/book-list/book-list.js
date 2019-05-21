import React, { Component } from 'react';
import { connect } from 'react-redux'
import './book-list.css';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequester } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';

class BookList extends Component {

  componentDidMount() {

    const { bookstoreService, booksLoaded, booksRequester } = this.props;
    booksRequester();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data));
  }

  render() {
    const { books, loading } = this.props;

    if (loading) {
      return <Spinner />
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
const mapStateToProps = ({ books, loading }) => {
  return { books, loading };
};

const mapDispatchToProps = {
  booksLoaded,
  booksRequester
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
