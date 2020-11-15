<template>
  <div class="my-app">
    <counter-view :counter="counter" />
    <counter-controller @on-increment="handleIncrement($event)" />
  </div>
</template>

<script>
import CounterView from './components/CounterView';
import CounterController from './components/CounterController';
export default {
  components: {
    CounterView,
    CounterController,
  },
  data() {
    return {
      counter: 100,
    };
  },
  methods: {
    handleIncrement(inc) {
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
