function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getHealth(health, attack) {
  return health > attack
    ? health - attack
    : 0;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      manaForSpecialAttack: 3,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.manaForSpecialAttack < 3;
    }
  },
  methods: {
    attackMonster() {
      this.manaForSpecialAttack++
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth = getHealth(this.monsterHealth, attackValue)
      this.attackPlayer()
  },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15)
      this.playerHealth = getHealth(this.playerHealth, attackValue)
    },
    specialAttackMonster() {
      this.manaForSpecialAttack = 0
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth = getHealth(this.monsterHealth, attackValue)
      this.attackPlayer()
    }
  }
})

app.mount('#game')
