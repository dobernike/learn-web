<template>
  <base-container title="Vuex">
    <the-counter></the-counter>
    <button @click="addOne">Add 1</button>
    <change-counter />
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter';
import ChangeCounter from './components/ChangeCounter';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter
  },
  methods: {
    addOne() {
      this.$store.commit('increment');
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
