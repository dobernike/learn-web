import * as $ from "jquery";
import React from "react";
import { render } from "react-dom";
import Post from "@/models/Post";
import json from "@/assets/json";
import xml from "@/assets/data.xml";
import WebpackLogo from "@/assets/webpack-logo";
import "./babel";
import "@/styles/styles.css";
import "@/styles/less.less";
import "@/styles/scss.scss";

const post = new Post("Webpack Post Title", WebpackLogo);

$("pre")
  .addClass("code")
  .html(post.toString());

console.log("Post to String:", post.toString());

console.log("JSON", json);
console.log("XML", xml);

const App = () => (
  <div class="container">
    <h1>Webpack Course</h1>

    <hr />

    <div class="logo"></div>

    <hr />

    <pre></pre>

    <hr />

    <div class="box">
      <h2>Less</h2>
    </div>

    <div class="card">
      <h2>SCSS</h2>
    </div>
  </div>
);

render(<App />, document.getElementById("app"));
