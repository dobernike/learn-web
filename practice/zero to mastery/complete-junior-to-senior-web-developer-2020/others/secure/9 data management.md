# hashing passwords and how to store him

bcrypt, scrypt, Aragon2

```js
const bcrypt = require('bgcypt');

bcrypt.hash('soup', null, null, function (err, hash) {
  console.log(hash); // SsasfSFf
  // Store hash in your password DB
});

bcrypt.compare('soup', 'SsasfSFf', function (err, res) {
  console.log(res); // true
  // res == true
});
```

# how to encrypt DB

for Postgres
pgcrypto - encrypt a few columns
