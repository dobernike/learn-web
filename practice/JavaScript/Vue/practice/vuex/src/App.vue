<template>
  <base-container title="Vuex">
    <the-counter></the-counter>
    <favorite-value></favorite-value>
    <button @click="addOne">Add 10</button>
    <change-counter />
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter';
import ChangeCounter from './components/ChangeCounter';
import FavoriteValue from './components/FavoriteValue';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavoriteValue
  },
  methods: {
    addOne() {
      // this.$store.dispatch('increase', { value: 10 });
      this.$store.dispatch({ type: 'increase', value: 10 });
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
