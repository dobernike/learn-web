<template>
  <base-container title="Vuex" v-if="isAuth">
    <the-counter></the-counter>
    <favorite-value></favorite-value>
    <button @click="increase({ value: 10 })">Add 10</button>
    <change-counter />
  </base-container>
  <base-container title="Auth">
    <user-auth></user-auth>
  </base-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter';
import ChangeCounter from './components/ChangeCounter';
import FavoriteValue from './components/FavoriteValue';
import UserAuth from './components/UserAuth.vue';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavoriteValue,
    UserAuth
  },
  methods: {
    // addOne() {
    //   // this.$store.dispatch('increase', { value: 10 });
    //   this.$store.dispatch({ type: 'increase', value: 10 });
    // },
    ...mapActions('numbers', ['increase'])
  },
  computed: {
    ...mapGetters(['isAuth'])
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
