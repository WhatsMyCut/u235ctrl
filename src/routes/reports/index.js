module.exports = {
  path: 'reports',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Reports'))
    })
  }
}
