export default class Post {
  constructor(title, img) {
    this.titile = title;
    this.img = img;
    this.data = new Date();
  }

  toString() {
    return JSON.stringify(
      {
        title: this.titile,
        date: this.date,
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
