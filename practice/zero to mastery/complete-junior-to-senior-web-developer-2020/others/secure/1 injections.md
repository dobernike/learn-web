// Bad
p.innerHTML = input

// Better
var textnode = document.createTextNode(input);
p.appendChild(textnode);

---

use knex.js to sql

knex.select('title', 'author', 'year).from('books')

Outputs:

select `title`, `author`, `year` from `books`
