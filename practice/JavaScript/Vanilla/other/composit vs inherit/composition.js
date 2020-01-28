function canCode({ name }) {
  return {
    code: () => console.log(`${name} is coding...`)
  };
}

function createProgrammer(name) {
  programmer = { name };
  return {
    ...programmer,
    ...canCode(programmer)
  };
}

function canAngular({ name }) {
  return {
    angular: () => console.log(`${name} is creating Angular app...`)
  };
}

function createFrontend(name) {
  const programmer = createProgrammer(name);

  return {
    ...programmer,
    ...canAngular(programmer),
    ...canReactAndVue(programmer)
  };
}

function canNodeJS({ name }) {
  return {
    nodejs: () => console.log(`${name} is programming on Node JS...`)
  };
}

function createBackend(name) {
  const programmer = createProgrammer(name);

  return {
    ...programmer,
    ...canNodeJS(programmer)
  };
}

function createFullstack(name) {
  const programmer = createProgrammer(name);

  return {
    ...programmer,
    ...canAngular(programmer),
    ...canNodeJS(programmer)
  };
}

function canReactAndVue({ name }) {
  return {
    react: () => console.log(`${name} is creating React app...`),
    vue: () => console.log(`${name} is creating Vue app...`)
  };
}
const programmer = createProgrammer("Programmer");
programmer.code();

const frontend = createFrontend("Frontend");
frontend.code();
frontend.angular();

const backend = createBackend("Backend");
backend.code();
backend.nodejs();

const fullstack = createFullstack("Fullstack");
fullstack.code();
fullstack.angular();
fullstack.nodejs();
