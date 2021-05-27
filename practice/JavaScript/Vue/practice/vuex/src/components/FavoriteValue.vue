<template>
  <h3>{{ normalizedCounter }}</h3>
  <p>we do more...</p>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // counter() {
    //   return this.$store.getters.normalizedCounter;
    // }
    ...mapGetters(['normalizedCounter'])
  }
};
</script>
