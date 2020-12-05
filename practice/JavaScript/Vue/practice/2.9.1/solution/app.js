const app = Vue.createApp({
    data() {
      return {
        name: 'Paul',
        age: 27,
        imageUrl: 'https://avatars.mds.yandex.net/get-zen_doc/27036/pub_5b0ef8177425f5280d011820_5b0ef881184f0900a952e4c9/scale_1200',
      }
    },
  computed: {
      ageIn5() {
        return this.age + 5;
    }
  },
  methods: {
      getRandom() {
        return Math.random()
      }
  }
});

app.mount('#assignment')
