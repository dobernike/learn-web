<template>
  <counter-view :counter="counter" />
  <counter-controller @on-increment="handleIncrement($event)" />
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

<style></style>
