const createTypeKeyedAdapter = (typeKey, adapter) => {
/*eslint-disable */
  // options parameter
  // eslint-disable extra-rules/no-commented-out-code
  // { query, params, id, options }
  // the internal `options` value is passed to jQuery ajax
  // and can be used to set custom headers and other options
  // specific to jQuery ajax internals
/*eslint-enable */
  return {
    findOne: (id, options) => adapter.findOne(typeKey, id, options),
    findAll: (options) => adapter.findAll(typeKey, options),
    findQuery: (query, options) => adapter.findQuery(typeKey, query, options),
    create: (body, options) => adapter.create(typeKey, body, options),
    update: (id, body, options) => adapter.update(typeKey, id, body, options),
    destroy: (id, options) => adapter.destroy(typeKey, id, options)
  }
}

module.exports = createTypeKeyedAdapter
