class Subject {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter(obs => observer !== obs);
  }

  fire(change) {
    this._observers.forEach(observer => {
      observer.update(change);
    });
  }
}

class Observer {
  constructor(state) {
    this.state = state;
    this.initialState = state;
  }

  update(change) {
    let state = this.state;
    switch (change) {
      case "INC":
        this.state = ++state;
        break;
      case "DEC":
        this.state = --state;
        break;
      default:
        this.state = this.initialState;
    }
  }
}

// usage
const sub = new Subject();

const obs1 = new Observer(1);
const obs2 = new Observer(19);

sub.subscribe(obs1);
sub.subscribe(obs2);

sub.fire("INC");

console.log(obs1.state); // 2
console.log(obs2.state); // 20
