function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getWidth(health) {
  return health < 0 ? { width: '0%' } : { width: health + '%' }
}

const INITIAL = {
  PLAYER_HEALTH: 100,
  MONSTER_HEALTH: 100,
  RAGE_FOR_SPECIAL_ATTACK: 3,
  WINNER: null,
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: INITIAL.PLAYER_HEALTH,
      monsterHealth: INITIAL.MONSTER_HEALTH,
      rageForSpecialAttack: INITIAL.RAGE_FOR_SPECIAL_ATTACK,
      winner: INITIAL.WINNER,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      return getWidth(this.monsterHealth)
    },
    playerBarStyles() {
      return getWidth(this.playerHealth)
    },
    mayUseSpecialAttack() {
      return this.rageForSpecialAttack < 3;
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Player lost
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Player lost
        this.winner = 'player'
      }
    }
  },
  methods: {
    startGame() {
        this.playerHealth = INITIAL.PLAYER_HEALTH
        this.monsterHealth = INITIAL.MONSTER_HEALTH
        this.rageForSpecialAttack = INITIAL.RAGE_FOR_SPECIAL_ATTACK
        this.winner = INITIAL.WINNER
        this.logMessages = []
    },
    attackMonster() {
      this.rageForSpecialAttack++
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth -= attackValue
      this.addLogMessage('player', 'attack', attackValue)
      this.attackPlayer()
  },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15)
      this.playerHealth -= attackValue
      this.addLogMessage('monster', 'attack', attackValue)
    },
    specialAttackMonster() {
      this.rageForSpecialAttack = 0
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth -= attackValue
      this.addLogMessage('player', 'special-attack', attackValue)
      this.attackPlayer()
    },
    healPlayer() {
      this.rageForSpecialAttack++
      const healValue = getRandomValue(8, 20)
      this.playerHealth = this.playerHealth + healValue < 100
        ? this.playerHealth + healValue
        : 100
      this.addLogMessage('player', 'heal', healValue)
      this.attackPlayer()
    },
    surrender() {
      this.winner = 'monster'
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      })
    }
  }
})

app.mount('#game')
