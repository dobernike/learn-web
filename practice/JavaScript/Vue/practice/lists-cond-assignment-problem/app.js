const app = Vue.createApp({
  data() {
    return {
      task: '',
      tasks: [],
      isListVisible: true
    }
  },
  computed: {
    buttonCaption() {
      return this.isListVisible ? 'Hide List' : 'Show List'
    }
  },
  methods: {
    addTask() {
      if (this.task === '') return

      this.tasks.push(this.task)
      this.task = ''
    },
    toggleListVisible() {
      this.isListVisible = !this.isListVisible
    }
  }
})

app.mount('#assignment')
