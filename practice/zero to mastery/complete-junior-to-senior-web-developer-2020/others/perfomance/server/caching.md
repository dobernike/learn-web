we can caching everything - cdn, browser, server, api, db, redis

```js
app.use(
  "/static",
  express.static(path_join(__dirname, "public"), { maxage: "2h" })
);
```

```js
app.get("/hi", (req, res) => {
  res.header("Cache-Control", "public, max-age=86400");
  res.header("Content-Type", "text/html");
  res.send(new Buffer("<h2>Test String</h2>"));
});
```
