import React, { Component } from "react";
import { EventEmmitter } from "./events";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      commentInput: "",
      searchInput: ""
    };
    EventEmmitter.subscribe("commentChange", event =>
      this.commentChange(event)
    );
    EventEmmitter.subscribe("addComment", event => this.addComment(event));
    EventEmmitter.subscribe("likePost", event => this.likePost(event));
    EventEmmitter.subscribe("searchChange", event => this.searchChange(event));
  }
}
