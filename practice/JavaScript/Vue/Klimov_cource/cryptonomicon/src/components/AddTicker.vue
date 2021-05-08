<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            @input="handleInputChanged"
            @keydown.enter="add(ticker)"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div
          v-if="hints.length"
          class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
        >
          <span
            v-for="hint in hints"
            :key="hint"
            @click="add(hint.Symbol)"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ hint.Symbol }}
          </span>
        </div>
        <div v-if="isTickerIncludes" class="text-sm text-red-600">
          Такой тикер уже добавлен
        </div>
      </div>
    </div>
    <add-button @click="add()" :disabled="isDisabledButton" class="my-4" />
  </section>
</template>

<script>
import AddButton from './AddButton';

export default {
  components: {
    AddButton,
  },

  emits: {
    add: (value) => typeof value === 'string' && value.trim() !== '',
    'input-changed': () => true,
  },

  props: {
    isDisabledAddButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    isTickerIncludes: {
      type: Boolean,
      required: true,
    },
    coinList: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      ticker: '',
      hints: [],
    };
  },

  computed: {
    isDisabledButton() {
      return this.isDisabledAddButton
        ? this.isDisabledAddButton
        : this.ticker.trim() === '';
    },
  },

  methods: {
    add(newTicker) {
      const ticker = newTicker ? newTicker : this.ticker;
      if (ticker.trim() === '') return;

      this.$emit('add', ticker);

      this.ticker = '';
      this.hints = [];
    },

    handleInputChanged() {
      this.$emit('input-changed');

      this.hints = [];
      if (this.ticker.trim() === '') return;

      const ticker = this.ticker.toLowerCase();
      const finds = this.coinList
        .filter((coin) => coin.Symbol.toLowerCase().includes(ticker))
        .reverse();

      const size = 4;
      const slicedFinds = finds.slice(0, size);

      for (const find of slicedFinds) {
        this.hints.push(find);
      }
    },
  },
};
</script>
