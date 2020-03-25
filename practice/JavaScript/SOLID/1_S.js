// Single Responsibility Principle

class News {
  constructor(title, text) {
    this.title = title;
    this.text = text;
    this.modified = false;
  }

  update(text) {
    this.text = text;
    this.modified = true;
  }

  // toHTML() {
  //   return `
  //     <div class="news">
  //       <h1>${this.title}</h1>
  //       <p>${this.text}</p>
  //     </div>
  //   `;
  // }

  // toJSON() {
  //   return JSON.stringify(
  //     {
  //       title: this.title,
  //       text: this.text,
  //       modified: this.modified
  //     },
  //     null,
  //     2
  //   );
  // }
}

class NewsPrinter {
  constructor(news) {
    this.news = news;
  }

  html() {
    return `
    <div class="news">
      <h1>${this.news.title}</h1>
      <p>${this.news.text}</p>
    </div>
  `;
  }

  json() {
    return JSON.stringify(
      {
        title: this.news.title,
        text: this.news.text,
        modified: this.news.modified
      },
      null,
      2
    );
  }

  xml() {
    return `
      <news>
        <title>${this.news.title}</title>
        <text>${this.news.text}</text>
      </news>
    `;
  }
}

const news = new News("Title", "text");
