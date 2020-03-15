const axios = require("axios");

class Ajax {
  static echo(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Error"));
        }
      }, 150);
    });
  }

  static async get() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ajax;
