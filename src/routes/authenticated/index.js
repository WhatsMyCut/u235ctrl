// return a function to allow the route onEnter hook
// access to the injected redux store
module.exports = function getRoute(store) {
  return {
    onEnter(nextState, replace) {
      if (!store.getState().auth.isLoggedIn) {
        replace('/login')
      }
    },
    path: '',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Authenticated'))
      })
    },
    indexRoute: { onEnter: (nextState, replace) => replace('/users') },
    childRoutes: [
      require('routes/users')(store)
    ]
  }
}
