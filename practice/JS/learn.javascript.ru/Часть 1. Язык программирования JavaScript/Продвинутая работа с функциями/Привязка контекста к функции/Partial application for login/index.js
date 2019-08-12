/**
 * Partial application for login
важность: 5

The task is a little more complex variant of Исправьте функцию, теряющую "this".

The user object was modified. Now instead of two functions loginOk/loginFail, it has a single function user.login(true/false).

What to pass askPassword in the code below, so that it calls user.login(true) as ok and user.login(false) as fail?

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

askPassword(?, ?); // ?

Your changes should only modify the highlighted fragment.
 */

askPassword(user.login.bind(user, true), user.login.bind(user, false));
