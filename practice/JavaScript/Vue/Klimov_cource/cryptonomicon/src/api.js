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

    messageBroadcast(message);
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

// doesn't work in Safari, use localStorage instead
const broadcastChannel = new BroadcastChannel('broadcast-channel');
broadcastChannel.onmessage = (event) => {
  console.log(event);
  if (event.data[CRYPTONOMICON_MESSAGE]) {
    const message = JSON.parse(event.data[CRYPTONOMICON_MESSAGE]);
    const { PRICE: price, FROMSYMBOL: ticker } = message;
    updateTickerPrice(ticker, price);
  }

  if (event.data[CRYPTONOMICON_MASTER_TAB_ACTIVE]) {
    const isMasterTabActive = JSON.parse(
      event.data[CRYPTONOMICON_MASTER_TAB_ACTIVE]
    );
    if (isMasterTabActive) return;
    connect();
  }
};

const setMasterTabActive = () => masterTabActiveBroadcast(true);
const setMasterTabInactive = () => masterTabActiveBroadcast(false);

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

function messageBroadcast(message) {
  broadcastChannel.postMessage({
    [CRYPTONOMICON_MESSAGE]: JSON.stringify(message),
  });
}

function masterTabActiveBroadcast(message) {
  broadcastChannel.postMessage({
    [CRYPTONOMICON_MASTER_TAB_ACTIVE]: JSON.stringify(message),
  });
}

window.addEventListener('beforeunload', setMasterTabInactive);
