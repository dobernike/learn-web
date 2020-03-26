addEventListener("click", function() {
  console.log("Button clicked");
});

console.log("Start");

console.log("Start 2");

function timeout2sec() {
  console.log("timeout2sec");
}

window.setTimeout(function() {
  console.log("Inside timeout, after 5000 sec");
}, 5000);

setTimeout(timeout2sec, 2000);

setTimeout(function() {
  console.log("inside settimeout");
}, 0);

console.log("End");
