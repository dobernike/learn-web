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
  return function<T extends { new (...args: any[]): object }>(Constructor: T) {
    return class extends Constructor {
      constructor(...args: any[]) {
        super(...args);

        const el = document.querySelector(config.selector)!;
        el.innerHTML = config.template;
      }
    };
  };
}

function Bind(
  _: any,
  _2: any,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value;

  return {
    configurable: true,
    enumerable: false,
    get() {
      return original.bind(this);
    }
  };
}

@Component({
  selector: "#card",
  template: `
    <div class="card">
      <div class="card-content">
        <span class="card-title">Card Component</span>
      </div>
    </div>
  `
})
class CardComponent {
  constructor(public name: string) {}

  @Bind
  logName(): void {
    console.log(`Component Name: ${this.name}`);
  }
}

const card = new CardComponent("My Card Component");

const btn = document.querySelector("#btn")!;

// btn.addEventListener("click", card.logName.bind(card));
btn.addEventListener("click", card.logName);

// ====================

type ValidatorType = "required" | "email";

interface ValidatorConfig {
  [prop: string]: {
    [validateProp: string]: ValidatorType;
  };
}

const validators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  validators[target.constructor.name] = {
    ...validators[target.constructor.name],
    [propName]: "required"
  };
}

function validate(obj: any): boolean {
  const objConfig = validators[obj.constructor.name];
  if (!objConfig) {
    return true;
  }
  let isValid = true;
  Object.keys(objConfig).forEach(key => {
    if (objConfig[key] === "required") {
      isValid = isValid && !!obj[key];
    }
  });
  return isValid;
}

class Iform {
  @Required
  public email: string | void;

  constructor(email?: string) {
    this.email = email;
  }
}

// const form = new Form(); // error valid
const iform = new Iform("v@mail.ru"); // valid

if (validate(iform)) {
  console.log("Valid: ", iform);
} else {
  console.log("Validation Error");
}

console.log(iform);
