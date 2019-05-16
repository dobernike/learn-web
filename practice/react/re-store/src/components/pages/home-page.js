import React from 'react';
import BookList from '../book-list';

const HomePage = () => {
  const books = [
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
  ];
  return (
    <BookList books={books} />
  );
}

export default HomePage;