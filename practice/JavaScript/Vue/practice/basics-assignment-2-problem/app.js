const app = Vue.createApp({
  data() {
    return {
      value: '',
      confirmedValue: ''
    }
  },
  methods: {
    showAlert(text) {
      alert(text)
    },
    handleInput(event) {
      this.value = event.target.value;
    },
    handleConfirmedInput() {
      this.confirmedValue = this.value;
    }
  }
});

app.mount('#assignment')
