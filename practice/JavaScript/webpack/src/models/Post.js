export default class Post {
  constructor(title) {
    this.titile = title;
    this.img = img;
    this.data = new Date();
  }

  toString() {
    return JSON.stringify(
      {
        title: this.titile,
        date: this.date.toJSON(),
        img: this.img
      },
      null,
      2
    );
  }

  get uppercaseTitle() {
    return this.title.toUpperCase();
  }
}
