import React, { Component } from 'react';
import { connect } from 'react-redux'
import './book-list.css';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';


class BookList extends Component {

  componentDidMount() {
    // receive data
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();

    // dispatch action to store
    this.props.booksLoaded(data);
  }

  render() {
    const { books } = this.props;
    return (
      <ul>
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
const mapStateToProps = ({ books }) => {
  return { books };
};

const mapDispatchToProps = {
  booksLoaded
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
