const app = Vue.createApp({
  data() {
    return {
      number: 0,
    }
  },
  computed: {
    result() {
      if (this.number < 37) return "Not there yet";

      if (this.number > 37) return "Too much!";

      return this.number
    }
  },
  watch: {
    result() {
      setTimeout(() => {
        this.number = 0;
      }, 5000);
    }
  },
  methods: {
    add(num) {
      this.number += num;
    }
  }
})

app.mount('#assignment')
