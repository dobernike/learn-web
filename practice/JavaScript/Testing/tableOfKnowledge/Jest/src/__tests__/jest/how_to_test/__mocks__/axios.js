// axios.js
export default {
  get: jest.fn(() => Promise.resolve({ data: "mocked" }))
};
