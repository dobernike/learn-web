<template>
  <button @click="$emit('on-increment', 1)">Increment</button>
  <button @click="$emit('on-increment', -1)">Decrement</button>
</template>

<script>
export default {};
</script>
