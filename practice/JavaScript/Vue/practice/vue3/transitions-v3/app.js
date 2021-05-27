const app = Vue.createApp({
  data() {
    return { isVisible: true };
  },
  methods: {
    toggleBox() {
      this.isVisible = !this.isVisible;
    },
  },
});

app.mount('#app');
