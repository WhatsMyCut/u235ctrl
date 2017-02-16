const qs = require('querystring')
const _ = require('lodash')

module.exports = {
  getPrevPageQuery(prevQuery) {
    let prevPage = this.getPrevPage(prevQuery)
    return qs.stringify(Object.assign({}, prevQuery, { page: prevPage }))
  },

  getNextPageQuery(prevQuery) {
    let nextPage = this.getNextPage(prevQuery)
    return qs.stringify(Object.assign({}, prevQuery, { page: nextPage }))
  },

  getPrevPage(prevQuery) {
    let page = parseInt(prevQuery.page, 10)
    let prevPage
    if (_.isFinite(page)) {
      prevPage = Math.max(page - 1, 1)
    } else {
      prevPage = 1
    }
    return prevPage
  },

  getNextPage(prevQuery) {
    let page = parseInt(prevQuery.page, 10)
    let nextPage
    if (_.isFinite(page)) {
      nextPage = page + 1
    } else {
      nextPage = 2
    }
    return nextPage
  }
}

