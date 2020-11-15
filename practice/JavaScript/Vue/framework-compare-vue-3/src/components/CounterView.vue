<template>
  <h1>{{ counter }}</h1>
</template>

<script>
export default {
  //   props: ['counter'],
  props: {
    counter: {
      type: Number,
      required: true,
      default: 500,
    },
  },
};
</script>
