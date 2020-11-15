<template>
  <div class="my-app">
    <h1>{{ counter }}</h1>
    <button v-on:click="increment(1)">Increment</button>
    <button v-on:click="increment(-1)">Decrement</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 100,
    };
  },
  methods: {
    increment(inc) {
      this.counter += inc;
    },
  },
};
</script>

<style>
.my-app {
  color: blue;
  padding: 15rem;
}

h1 {
  font-size: 50px;
}
</style>
