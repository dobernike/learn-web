<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div
      v-if="loading"
      class="fixed w-100 h-100 opacity-80 bg-purple-800 inset-0 z-50 flex items-center justify-center"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <div class="container">
      <add-ticker
        @add="handleAddTicker"
        @input-changed="handleInputChanged"
        :isTickerIncludes="isTickerIncludes"
        :coinList="coinList"
        :isDisabledAddButton="isDisabledAddButton"
      />
      <template v-if="tickers.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <p>
          <button
            v-if="page > 1"
            @click="page -= 1"
            class="my-4 mx-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            НАЗАД
          </button>
          <button
            v-if="hasNextPage"
            @click="page += 1"
            class="my-4 mx-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            ВПЕРЕД
          </button>
          <br />
          <label>Фильтр <input v-model="filter" /></label>
        </p>
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            v-for="t in paginatedTickers"
            :key="t.name"
            :class="{
              'border-4': t === presentation,
            }"
            class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
          >
            <div
              @click="selectTicker(t)"
              :class="{ 'bg-red-100': t.price === 'ERROR' }"
              class="px-4 py-5 sm:p-6 text-center"
            >
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ t.name }} - USD
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ formatPrice(t.price) }}
              </dd>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            <button
              @click="deleteTicker(t)"
              class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path></svg
              >Удалить
            </button>
          </div>
        </dl>
        <hr class="w-full border-t border-gray-600 my-4" />
      </template>
      <ticker-chart @close-chart="closePresentation" :presentation="presentation" :graph="graph" />
    </div>
  </div>
</template>

<script>
import {
  loadCoinList,
  subscribeToTicker,
  unsubscribeFromTicker,
} from './api.js';
import AddTicker from './components/AddTicker';
import TickerChart from './components/TickerChart';

const MAX_PER_PAGE = 6;
const MIN_WIDTH_BAR = 38;
const MAX_TICKERS_PER_APP = 20;

export default {
  components: {
    AddTicker,
    TickerChart,
  },

  data() {
    return {
      loading: true,
      tickers: [],
      isTickerIncludes: false,
      presentation: null,
      graph: [],
      coinList: {},
      filter: '',
      page: 1,
    };
  },

  created() {
    this.MIN_WIDTH_BAR = MIN_WIDTH_BAR;

    let params = new URL(document.location).searchParams;

    const VALID_KEYS = ['filter', 'page'];

    VALID_KEYS.forEach((key) => {
      if (params.has(key)) {
        this[key] = params.get(key);
      }
    });

    const list = localStorage.getItem('cryptonomicon-list');

    if (list) {
      this.tickers = JSON.parse(list);
      this.tickers.map(({ name }) =>
        subscribeToTicker(name, (price) => this.updateTicker(name, price))
      );
    }
  },

  async mounted() {
    this.coinList = await loadCoinList();
    this.loading = false;
  },

  computed: {
    isDisabledAddButton() {
      return this.tickers.length >= MAX_TICKERS_PER_APP;
    },

    startIndex() {
      return MAX_PER_PAGE * (this.page - 1);
    },

    endIndex() {
      return MAX_PER_PAGE * this.page;
    },

    filteredTickers() {
      return this.tickers.filter(({ name }) =>
        name.toLowerCase().includes(this.filter.toLowerCase())
      );
    },

    hasNextPage() {
      return this.filteredTickers.length > MAX_PER_PAGE * this.page
        ? true
        : false;
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.startIndex, this.endIndex);
    },

    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page,
      };
    },
  },

  methods: {
    updateTicker(tickerName, price) {
      this.tickers.find(({ name }) => name === tickerName).price = price;

      if (this.presentation?.name === tickerName) {
        this.graph.push(price);
      }
    },

    formatPrice(price) {
      if (price === 'ERROR') return '-';
      if (price === '-') return price;

      return price > 1 ? price.toFixed(2) : price.toPrecision(2);
    },

    handleAddTicker(ticker) {
      if (this.getIsTickerIncludes(ticker)) {
        return (this.isTickerIncludes = true);
      }

      const tickerToAdd = {
        name: ticker.toUpperCase(),
        price: '-',
      };

      this.tickers = [...this.tickers, tickerToAdd];
      subscribeToTicker(tickerToAdd.name, (price) =>
        this.updateTicker(tickerToAdd.name, price)
      );

      this.isTickerIncludes = false;
    },

    deleteTicker(tickerToDelete) {
      if (this.presentation === tickerToDelete) {
        this.closePresentation();
      }

      this.tickers = this.tickers.filter((ticker) => ticker !== tickerToDelete);
      unsubscribeFromTicker(tickerToDelete.name);
    },

    selectTicker(ticker) {
      this.presentation = ticker;
    },

    closePresentation() {
      this.presentation = null;
    },

    handleInputChanged() {
      this.isTickerIncludes = false;
    },

    getIsTickerIncludes(ticker) {
      return this.tickers.some(
        ({ name }) => name.toLowerCase() === ticker.toLowerCase()
      );
    },
  },

  watch: {
    presentation() {
      this.graph = [];
    },

    tickers() {
      localStorage.setItem('cryptonomicon-list', JSON.stringify(this.tickers));
    },

    paginatedTickers() {
      if (this.paginatedTickers.length === 0 && this.page > 1) {
        this.page -= 1;
      }
    },

    filter() {
      this.page = 1;
    },

    pageStateOptions(values) {
      const url = new URL(window.location);
      Object.entries(values).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      window.history.pushState({}, '', url);
    },
  },
};
</script>
