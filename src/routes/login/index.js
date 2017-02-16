// return a function to allow the route onEnter hook
// access to the injected redux store
module.exports = function(store) {
  return {
    path: 'login',
    onEnter(nextState, replace) {
      // navigate to a default route if the user is logged in
      // the authenticated route has a similar onEnter to navigate
      // to login if the user is *not* logged in
      if (store.getState().auth.isLoggedIn) {
        replace('/users')
      }
    },
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Login'))
      })
    }
  }
}
