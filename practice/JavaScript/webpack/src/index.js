import * as $ from "jquery";

import Post from "@/models/Post";
import json from "@/assets/json";
import xml from "@/assets/data.xml";
import WebpackLogo from "@/assets/webpack-logo";
import "@/styles/styles.css";

const post = new Post("Webpack Post Title", WebpackLogo);

$("pre")
  .addClass("code")
  .html(post.toString());

console.log("Post to String:", post.toString());

console.log("JSON", json);
console.log("XML", xml);
