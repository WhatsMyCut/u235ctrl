module.exports = {
  path: 'import-export-setup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ImportExportSetup'))
    })
  }
}
