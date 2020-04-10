import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }

  displayAuthors() {
    const data = this.props.data;

    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    }

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>
            Book name:
            <input
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </label>
        </div>

        <div className="field">
          <label>
            Genre:
            <input
              type="text"
              onChange={(e) => this.setState({ genre: e.target.value })}
            />
          </label>
        </div>

        <div className="field">
          <label>
            Author:
            <select
              onChange={(e) => this.setState({ authorId: e.target.value })}
            >
              <option>Select author</option>
              {this.displayAuthors()}
            </select>
          </label>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
