import React, { Component } from 'react';
import './book-list.css';
import BookListItem from '../book-list-item';


export default class BookList extends Component {
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
