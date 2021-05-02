const API_URL = 'https://min-api.cryptocompare.com/data';
const API_KEY =
  '73f89886b75e4cb708beb44cebe67c3f5748664a03ce3f344c08582445dbde2c';
const DEFAULT_CURRENCY = 'USD';

export const loadCoinList = async () => {
  const request = await fetch(`${API_URL}/all/coinlist?summary=true`);
  const responce = await request.json();

  return Object.values(responce.Data);
};

const AGGREGATE_INDEX = '5';
const MARKET = 'CCCAGG';

const tickersHandlers = new Map();

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  const { TYPE: type, PRICE: price, FROMSYMBOL: ticker } = data;

  if (type !== AGGREGATE_INDEX || !price || !ticker) return;

  const handlers = tickersHandlers.get(ticker);
  handlers.forEach((cb) => cb(price));
});

const sendToWebSocket = (message) => {
  const stringifiedMessage = JSON.stringify(message);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    'open',
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
};

const subscribeToTickerOnWs = (ticker) => {
  sendToWebSocket({
    action: 'SubAdd',
    subs: [`${AGGREGATE_INDEX}~${MARKET}~${ticker}~${DEFAULT_CURRENCY}`],
  });
};

const unsubscribeFromTickerOnWs = (ticker) => {
  sendToWebSocket({
    action: 'SubRemove',
    subs: [`${AGGREGATE_INDEX}~${MARKET}~${ticker}~${DEFAULT_CURRENCY}`],
  });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWs(ticker);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
  unsubscribeFromTickerOnWs(ticker);
};
