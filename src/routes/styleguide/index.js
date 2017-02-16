module.exports = function() {
  return {
    path: 'styleguide',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/StyleGuide'))
      })
    }
  }
}

