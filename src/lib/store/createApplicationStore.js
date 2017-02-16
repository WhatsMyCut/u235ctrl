const { createStore, applyMiddleware, compose } = require('redux')
const thunk = require('redux-thunk').default
const rootReducer = require('lib/store/reducers/rootReducer')

// Create the application store with redux.
// Redux uses `reducers` to allow different types of dispatched
// actions to mutate global state in one place.
// All actions should be dispatched and go
// through the reducers of the application store.
// See more on redux here:
// * http://redux.js.org/
// * https://egghead.io/series/getting-started-with-redux
// * https://egghead.io/series/building-react-applications-with-idiomatic-redux
//
// The redux-thunk middleware allows dispatched actions to work
// asynchronously by returning a function instead of new state
// See more on redux-thunk here:
// * https://github.com/gaearon/redux-thunk

module.exports = function() {
  return createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
}
