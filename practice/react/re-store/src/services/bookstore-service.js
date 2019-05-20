
export default class BookstoreService {

  data = [
    {
      id: 1,
      title: `JavaScript: The Good Parts`,
      author: `Douglas Crockford`,
      price: 32,
      coverImage: `https://covers.oreillystatic.com/images/9780596517748/lrg.jpg`
    },
    {
      id: 2,
      title: `You Don’t Know JS`,
      author: `Kyle Simpson`,
      price: 45,
      coverImage: `https://images-na.ssl-images-amazon.com/images/I/514mHNWl0wL._SX330_BO1,204,203,200_.jpg`
    }
  ];

  getBooks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data)
      }, 700);
    });
  }

}