import { createNanoEvents } from 'nanoevents';

export const emitter = createNanoEvents();

export const subscribeWithEffect = (effect, name, cb) => {
  subscribe(name, cb);
  effect(name);
};

export const unsubscribeWithEffect = (effect, name) => {
  unsubscribe(name);
  effect(name);
};

const subscribe = (name, cb) => emitter.on(name, cb);

const unsubscribe = (name) => delete emitter.events[name];
