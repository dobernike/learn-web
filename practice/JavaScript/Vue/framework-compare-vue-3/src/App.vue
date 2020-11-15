<template>
  <div class="app-container">
    <counter-app />
  </div>
</template>

<script>
import CounterApp from './CounterApp';
export default {
  components: {
    CounterApp,
  },
};
</script>

<style scoped>
.app-container {
  color: blue;
  padding: 15rem;
}
</style>
