// html
// <!DOCTYPE html>
// <html>
//   <head>
//     <style>
//       .red {
//         background-color: red;
//       }
//     </style>
//   </head>
//   <body>
//     <div
//       style="
//         width: 100px;
//         display: flex;
//         justify-content: center;
//         flex-direction: column;
//       "
//     >
//       <h1>Reactive</h1>
//       <button id="counter" type="button" style="margin-bottom: 10px">
//         counter: 0
//       </button>
//       <button id="reset" type="button">reset</button>
//     </div>
//     <script type="module" src="/src/main.js"></script>
//   </body>
// </html>

import { ref, watch, watchEffect, computed } from 'vue';

const counterBtn = document.querySelector('#counter');
const resetBtn = document.querySelector('#reset');

/* REACT WAY -->
const useCounter = () => {
  let counter = 0;

  const renderCounter = () => {
    counterBtn.textContent = `counter: ${counter}`;
    counterBtn.classList.toggle('red', counter > 9);
  };

  return {
    getCounter() {
      return counter;
    },
    setCounter(value) {
      counter = value;
      renderCounter();
    },
  };
};
const { getCounter, setCounter } = useCounter();
*/

/* VUE 2 WAY -->

const renderCounter = () => {
  counterBtn.textContent = `counter: ${counter.value}`;
  counterBtn.classList.toggle('red', counter.value > 9);
};

const counterState = {
  val: 0,
  get value() {
    return this.val;
  },

  set value(v) {
    this.val = v;
    renderCounter();
  },
};
*/

/* VUE 3 WAY -->
const target = { value: 0 };

const handler = {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, receiver) {
    target[prop] = receiver;
    renderCounter();
    return target[prop];
  },
};

const counterState = new Proxy(target, handler);
*/

const counterState = ref(0);
const isCounterTooBig = computed(() => counterState.value > 9);
// instead of
// function isCounterTooBig() {
//   return counterState.value > 9;
// }
watchEffect(renderCounter);
// same as
// watch(counterState, renderCounter);
watchEffect(updateCounterColor);

function renderCounter() {
  counterBtn.textContent = `counter: ${counterState.value}`;
}

function updateCounterColor() { // will be render only when computed will changed
  counterBtn.classList.toggle('red', isCounterTooBig.value);
}

counterBtn.addEventListener('click', () => {
  counterState.value += 1;
});

resetBtn.addEventListener('click', () => {
  counterState.value = 0;
});

setInterval(() => {
  counterState.value += 1;
}, 1000);
