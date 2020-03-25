// Dependency inversion principle

class Fetch {
  request(url) {
    return Promise.resolve("data");
  }
}

class LocalStorage {
  get() {
    const dataFromLocalStorage = "data";
    return dataFromLocalStorage;
  }
}

class FetchClient {
  constructor() {
    this.fetch = new Fetch();
  }

  clientGet() {
    return this.fetch.request("vk.com");
  }
}

class LocalStorageClient {
  constructor() {
    this.localStorage = new LocalStorage();
  }

  clientGet() {
    return this.localStorage.get();
  }
}

class Database {
  constructor() {
    this.client = client;
  }

  getData() {
    return this.client.clientGet(key);
  }
}

const db = new Database(new LocalStorage());

console.log(db.getData("rand"));
