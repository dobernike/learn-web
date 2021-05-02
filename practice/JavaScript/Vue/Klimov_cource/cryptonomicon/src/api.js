const API_URL = 'https://min-api.cryptocompare.com/data';
const API_KEY =
  '73f89886b75e4cb708beb44cebe67c3f5748664a03ce3f344c08582445dbde2c';
const DEFAULT_CURRENCY = 'USD';

export const loadCoinList = async () => {
  const request = await fetch(`${API_URL}/all/coinlist?summary=true`);
  const responce = await request.json();

  return Object.values(responce.Data);
};

const tickersHandlers = new Map();

export const loadTickers = async () => {
  if (tickersHandlers.size === 0) return;

  const tickersString = [...tickersHandlers.keys()].join(',');
  const request = await fetch(
    `${API_URL}/pricemulti?fsyms=${tickersString}&tsyms=${DEFAULT_CURRENCY}&api_key=${API_KEY}`
  );
  const responce = await request.json();

  const tickers = Object.fromEntries(
    Object.entries(responce).map(([ticker, price]) => [
      ticker,
      price[DEFAULT_CURRENCY],
    ])
  );

  Object.entries(tickers).forEach(([ticker, price]) => {
    const handlers = tickersHandlers.get(ticker);
    handlers.forEach((cb) => cb(price));
  });

  return tickers;
};

export const subscribeToTicker = (tickerName, cb) => {
  const subscribers = tickersHandlers.get(tickerName) || [];
  tickersHandlers.set(tickerName, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (tickerName) => {
  if (tickersHandlers.has(tickerName)) {
    tickersHandlers.delete(tickerName);
  }
};

window.setInterval(() => loadTickers(), 3000);
