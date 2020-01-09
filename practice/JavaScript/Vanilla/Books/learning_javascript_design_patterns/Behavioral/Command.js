class SpecialMath {
  constructor(num) {
    this._num = num;
  }

  square() {
    return this._num ** 2;
  }

  cube() {
    return this._num ** 3;
  }

  squareRoot() {
    return Math.sqrt(this._num);
  }
}

class Command {
  constructor(subject) {
    this._subject = subject;
    this.commandsExecuted = [];
  }
  execute(command) {
    this.commandsExecuted.push(command);
    return this._subject[command]();
  }
}

// usage
const x = new Command(new SpecialMath(5));
x.execute("square");
x.execute("cube");

console.log(x.commandsExecuted); // ['square', 'cube']
