function Log(constructor: Function) {
  console.log(constructor);
}

function Log2(target: any, propName: string | Symbol) {
  console.log(target, propName);
}

function Log3(
  target: any,
  propName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target, propName, descriptor);
}

@Log
class Component1 {
  @Log2
  name: string;

  @Log3
  get componentName() {
    return this.name;
  }

  constructor(name: string) {
    this.name = name;
  }

  @Log3
  logName(): void {
    console.log(`Component Name: ${this.name}`);
  }
}

// =========== like Angular

interface ComponentDecorator {
  selector: string;
  template: string;
}

function Component(config: ComponentDecorator) {
  return function(constructor: Function) {};
}

@Component({
  selector: "#card",
  template: ``
})
class CardComponent {
  constructor(public name: string) {}

  logName(): void {
    console.log(`Component Name: ${this.name}`);
  }
}
