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

let socket;
const connect = () => {
  socket = new WebSocket(
    `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
  );
  [...tickersHandlers.keys()].forEach((ticker) =>
    subscribeToTickerOnWs(ticker)
  );

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    const { TYPE: type, PRICE: price, FROMSYMBOL: ticker } = message;

    if (type !== AGGREGATE_INDEX || !price || !ticker) return;

    message_broadcast(message);
    updateTickerPrice(ticker, price);
  });
};
connect();

function updateTickerPrice(ticker, price) {
  const handlers = tickersHandlers.get(ticker);
  handlers.forEach((cb) => cb(price));
}

const CRYPTONOMICON_MESSAGE = 'cryptonomicon-message';
const CRYPTONOMICON_MASTER_TAB_ACTIVE = 'cryptonomicon-master-tab-active';

const setMasterTabActive = () =>
  localStorage.setItem(CRYPTONOMICON_MASTER_TAB_ACTIVE, true);

const setMasterTabInactive = () =>
  localStorage.setItem(CRYPTONOMICON_MASTER_TAB_ACTIVE, false);

const sendToWebSocket = (message) => {
  const stringifiedMessage = JSON.stringify(message);
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    setMasterTabActive();
    return;
  }

  socket?.addEventListener(
    'open',
    () => {
      socket.send(stringifiedMessage);
      setMasterTabActive();
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

window.addEventListener('storage', message_receive);

function message_broadcast(message) {
  localStorage.setItem(CRYPTONOMICON_MESSAGE, JSON.stringify(message));
}

function message_receive(event) {
  if (event.key == CRYPTONOMICON_MESSAGE) {
    const message = JSON.parse(event.newValue);
    const { PRICE: price, FROMSYMBOL: ticker } = message;
    updateTickerPrice(ticker, price);
  }

  if (event.key === CRYPTONOMICON_MASTER_TAB_ACTIVE) {
    const isMasterTabActive = JSON.parse(event.newValue);
    if (isMasterTabActive) return;
    connect();
  }
}

window.addEventListener('beforeunload', setMasterTabInactive);
