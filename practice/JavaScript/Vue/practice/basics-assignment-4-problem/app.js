const app = Vue.createApp({
  data() {
    return {
      inputClass: '',
      inputStyle: '',
      isParagraphVisible: true,
    }
  },
  computed: {
    paragraphClasses() {
      return {
        user1: this.inputClass === 'user1',
        user2: this.inputClass === 'user2',
        hidden: !this.isParagraphVisible,
      }
    }
  },
  methods: {
    toggleParagraph() {
      this.isParagraphVisible = !this.isParagraphVisible
    },
  }
})

app.mount('#assignment')
