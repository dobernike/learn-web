<template>
  <div class="counter-view">
    <h1>{{ counter }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Number,
      required: true,
      default: 500,
    },
  },
};
</script>

<style scoped lang="scss">
.counter-view {
  h1 {
    font-size: 50px;
  }
}
</style>
