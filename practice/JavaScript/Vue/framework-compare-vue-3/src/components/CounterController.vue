<template>
  <button @click="increment(1)">Increment</button>
  <button @click="increment(-1)">Decrement</button>
</template>

<script>
export default {
  emits: ['on-increment'],
  methods: {
    increment(inc) {
      this.$emit('on-increment', inc);
    },
  },
};
</script>
