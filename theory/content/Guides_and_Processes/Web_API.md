# WEB API

# WebRTC

## Что такое WebRTC

[https://www.youtube.com/watch?v=lslU9JM36Qo]

WebRTC (Web Real Time Communications) — это стандарт, который описывает передачу потоковых аудиоданных, видеоданных и контента от браузера и к браузеру в режиме реального времени без установки плагинов или иных расширений.

WebRTC работает только на современных браузерах (ie11 не может)

получение доступа к камере и микрофона в веб приложениях напрямую без посредников (например flash)

Может в Peer-To-Peer

WebRTC может быть аналогом Skype

## Зачем и как блокировать WebRTC

[https://www.youtube.com/watch?v=o0_0DwDMZSA]

Все соеденения защищены и зашифрованны (hangouts на нем)

Недостаток:
Раскрытие ip-адресса

Можно заблокировать WebRTC

или скрыть ip с помощью плагина
(whoer plugin)

## WebRTC: делаем видеозвонки из браузера / Григорий Петров (Voximplant)

[https://www.youtube.com/watch?v=PcvYEQxwEQ8]

Плохая передача звука и картинки через Flash

### Зачем нужно WebRTC?

Для замены Flash и Air как средства коммуникации в реальном времени между браузерами и/или приложениями

P2P сетевые подключения c NAT traversal
Голос и видео: получить, отправить, играть
Битрейт, кодеки, разрешения, шум, эхо
P2P-передача данных в стиле UDP или TCP
Запись голоса и видео в браузере

`2010 придумали и Осень 2013 первые реализации`

`2017 все сделали`

### 4 браузера с WebRTC: оно одинаковое?

Только H.264 видеокодек в Safari
Screen sharing, canvas только Chrome и Firefox
В Edge нет "data channel"
H.264UC, TURN, Trickle ICE и другие мелочи

### разница в SDP

WebRTC очень нравятся P2P-подключение
STUN сервера, чтобы узнать внешний IP
TURN сервера, если P2P не удалось
Обмен информацией через SDP-пакеты
Еще в SDP информация о медиаданных
SDP плохо, если более одного медиапотока

### Более одного медиапотока в SDP

Chrome, Safari и Edge: "Plan B" SDP
Firefox: "Unified plan SDP"
Либы вроде "adapter.js" для "перевода"

### Теперь без SDP

WebRTC 1.1 это "oRTC" без SDP
Edge - единственный браузер с этой версией
...и версией WebRTC 1.0 "для совместимости"

### Насколько юзабельно?

Работает для простых голосовых/видео звонков

- Нет включений/выключений голоса/видео
- Нет screen sharing во время видеозвонка
- Не используются фичи вроде "simulcast"

### Не только в браузерах

"libwebrtc" от Google собирается под любую платформу

Такую как Android, iOS или PC

альтернатива - "openwebrtc"

### заблуждения о WebRTC

WebRTC не "безопаснее"
C WebRTC не всегда ниже задержки
Это не "чистое P2P": нужна сигнализация

### WebRTC - это круто!

Skype for Web
Онлайн-образование
Телемедицина
Сенсоры реального времени (не в Edge)
Стриминг интерактивного видео
... и много других

## О WebRTC просто и без магии: как устроен путь кадра в Интернете / Кирилл Роговой (Skyeng)

[https://www.youtube.com/watch?v=EZQ_RA5KTc8]

### WebRTC в одном слайде

TCP - WebSocket
UDP - WebRTC

- - Media
- - P2P

Открываем UDP порт
Знаем IP:port партнера
Заворачиваем трафик в RTP

### 7 шагов от веб-камеры до экрана

1. Захват камеры

- navigator.mediaDevices.
- Размер чистого потока
  - изображение 640х480, 32bit: 1.2mb
  - 30 кадров, 1 секунда: 36mb
  - битрейт: 288mbps

2. Кодирование

- JPEG, 640x480
  - 1.2mb -> 123kb
  - 288mbps -> 28mbps
- VP9, 1280x720 - 1.5mbps
- Диффы, keyframe, interframe

3. Запаковка в RTP

- Порядок
- Время
- Треки
- Оверхед: ~5% (62 / 1204)
- RTCP: RTP Control Protocol

4. Передача по сети через UDP

- Главный плюс UDP: минимальный интервал между пакетами
- Минусы UDP
  - пакеты теряются
  - пакеты приходят поздно
  - пакеты приходят в другом порядке

5. Распаковка RTP

- Восстанавливаем порядок
- Достаем видео-трафик
- Передаем в декодер

6. Декодирование

- Передаем данные в правильном порядке
- На выходе -- чистый видео-поток -- MediaStream

7. Отрисовка на экране <video>

- Прикрепляем поток к элементу и получаем картинку

### Реальный мир

- Кодек: keyframe, interframe
- Сеть
  - пакеты теряются - packet loss
  - пакеты приходят поздно - delay
  - пакеты приходят в другом порядке - jitter
- RTP
  - Хранит порядок и время
  - RTCP

### Откуда потери пакетов?

- Остаются в стенах дома - Random loss или Lossy network
- Дропаются по ошибке: баги в OC или сетевом оборудовании
- Дропаются из-за перегрузки сети - Network congestion

### Пакет не пришел вовремя! Что делать?

- Нельзя проигнорировать: keyframe, interframe
- RTCP: попросим прислать пакет заново, но нужно ждать RTT
- Что если потеряли сразу несколько пакетов?

#### 4 решения

1. рендерим на оди RTT позже - Jitter buffer

- Минус: дополнительная постоянная задержка
- Плюсы:
  - Есть время запросить недостающий пакет
  - При массовой потере, больше времени на запрос keyframe

2. уменьшаем битрейт

- Битрейт = FPS _ качество _ разрешение
- Минусы:
  - Хуже качество (временно)
  - Не поможет с random loss
- Плюс: поможет с network congestion

3. Forward Error Correction

- Умное дублирование данных на уровне кодека
- Минус: выше битрейт - усуглубляет network congestion
- Плюс: выше шанс доставки контента с первого раза

4. сетевой тюнинг

- Лучшие сетевые маршруты
- Настройка серверов и маршрутизаторов

---

## Укрощаем WebRTC - Григорий Петров | DevFest Siberia 2016

[https://www.youtube.com/watch?v=XUK-SBRpXv0]

### Проблема?

Кроссплатформенные видео и голосовые коммуникации

Flash для вебсайтов, AIR для десктоп и мобильных приложений

Низкое качество звука и видео
Media Server и Media Gateway стоят дорого
Платформы трудно интегрировать в приложения

### Решение

Протоколы и API для браузеров
Новый стандарт - WebRTC

### Что такое WebRTC?

- JavaScript API для браузеров
  - Видео и голос, запись и воспроизведение
  - Связь peer-to-peer в реальном времени
- Протоколы и кодеки: SRTP, SDP, Opus, G.711, H.264, H.265, VP8, VP9
- Внешний сигнальный протокол (от SIP до HTTP)

### Как используется

Кроссплатформенные аналоги Skype
Образование и телемедицина
Пульт управления в реальном времени
Интерактивное видеовещание
... и еще много всего интерестного!

### Звучит слишком хорошо?

на момент конца 2016 года

Быстро меняющийся
Пока не поддерживается IE11 и Safari
Библиотека низкого уровня libwebrtc, нет SDK

### Как этим пользуются?

Платформы для разработчиков

Twillo
TokBox
Voximplant

### Чем помогает платформа

SDK высокого уровня для web и mobile
Сервер для signaling и работы со звонками
Flash в качестве запасного варианта
Backend с чем-нибудь, например JavaScript
Батарейки на backend: IVR, ASR, TTS ...
Интеграция с телефонией: SIP и не только

## WebRTC-шная тема | Технострим

[https://www.youtube.com/watch?v=nqigzFbAYM0]

- Video

  - VP8 Codec
  - Jitter Buffer

- Audio

  - iSAC/iLBC
  - NetEQ
  - Echo/Noise

- Transport
  - SRTP
  - STUN | TURN | ICE

WebRTC API

RTCPeerConnection - общий класс подключения

все крутиться вокруг него

1. Все начинается с конструктора

```js
initConnection = (id: string): RTCPeerConnection => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:4.l.google.com:19302' },
      {
        urls: 'turn:turn.interpals.net:3478',
        credential: 'meow',
        username: 'pewdiepie',
      },
    ],
  });
};
```

1. Interactive Connectivity Establishment (ICE)

Это процесс нахождения "соединения" между двумя клиентами

Между P2P может быть 3 ситуации

Только один пользователь за NAT
оба за NAT
оба без NAT

По этому есть

STUN - Simple Traversal Utilities 4 NAT
TURN - Traversal Using Relay NAT

STUN - 1 клиент за NAT (публичные)
TURN - оба клиента за NAT (приватные)

2. addStream / createDataChannel

```js
// NOTE
// The addStream method that used to exist on RTCPeerConnection is easy to polyfill as:

RTCPeerConnection.prototype.addStream = function (stream) {
  stream.ggetTracks().forEach((track) => this.addTrack(track, stream));
};
```

Но сначала нужно получить его

Media Capture and Streams

```js
window.navigator.getUserMedia(
  {
    audion: true,
    video: {
      width: 1024,
      height: 720,
    },
  },
  this.getUserMediaSuccess,
  this.getUserMediaFail
);
```

on ice candidate

```js
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    this.props.wsRTCSignal(
      'RTC_ICE_CANDIDATE',
      this.props.call.room,
      this.clientId,
      id,
      event.candidate
    );
  }
};
```

Что такое signal server?

XMLHttpRequest or Web Sockets

```js
EventEmitterWS.on('RTC_OFFER', this.filterMessage(this.onRTCOffer));
EventEmitterWS.on('RTC_ANSWER', this.filterMessage(this.onRTCAnswer));
EventEmitterWS.on('RTC_ICE_CANDIDATE', this.filterMessage(this.onIceCandidate));
```

Звонящий

1. createOffer(offer)

2. setLocalDescription(offer)

3. SIGNALING RTC_OFFER

Принимающий - ON_OFFER(offer)

1. setRemoteDescription(offer)

2. createAnswer(answer)

3. setLocalDescription(answer)

4. SIGNALING RTC_ANSWER

Звонящий - RTC_ANSWER(answer)

setRemoteDescription(answer)

SDP - Session Description Protocol

```js
declare type RTCSessionDescriptionInit = {
  type: 'offer' | 'answer',
  sdp: string,
};
```

iceConnectionState & connectionState

```js
declare type RTCPeerConnectionState =
  | 'new'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'failed'
  | 'closed';

declare type RTCIceConnectionState =
  | 'new'
  | 'checking'
  | 'connected'
  | 'completed'
  | 'failed'
  | 'disconnected'
  | 'closed';
```

### Реализация

Вызывающий

1. window.open('/call/make-call')

Принимающий

1. window.open('/call/video/{id}')

Вызывающий CallHandler

1. POST /call/v1
2. POST /message/v1

Принимающий - CallHandler

1. PUT /call/v1/{id}/action/accept

Что такео Call?

```js
export type CallEntity = {
  id: string,
  uid: string,
  target_id: string,
  participants: Array<UserResponse>,
  type: 'video' | 'audio',
  status: CallEntityStatus,
  duration: number,
  created: string,
  room: string,
};
```

ClientId = random string

```js
clientId: string = generateFakeId();
connections: Map<string, RTCPeerConnection> = new Map();
```

P2P - Каждый с каждым

Room = HEX(randomInt());

```js
EventEmitter.on('open', () => {
  this.props.wsRoomJoin(call.room, this.clientId);
});
```

Extensions

```js
createDataChannel(
    label: string | null,
    dataChannelDict?: RTCDataChannelInit
): RTCDataChannel;

getStats(
    selector?: MediaStreamTrack | null
): Promise<RTCStatsReport>
```
