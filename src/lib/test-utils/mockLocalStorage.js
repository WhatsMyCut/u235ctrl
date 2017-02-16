// this method should be run inside of a describe block
// to mock localStorage for all tests in the block
module.exports = () => {
  let realLocalStorage = window.localStorage

  beforeEach(() => {
    let storage = {}

    let mockLocalStorage = {
      getItem(key) { return storage[key] },
      setItem(key, value) { storage[key] = value.toString() },
      clear() { storage = {} },
      removeItem(key) { delete storage[key] }
    }

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      configurable: true,
      writable: true
    })
  })

  afterEach(() => {
    window.localStorage = realLocalStorage
  })
}
