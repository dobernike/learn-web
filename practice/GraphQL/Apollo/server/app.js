const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://paul:123@cluster0-th9bd.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connect to db");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("list 4000");
});
