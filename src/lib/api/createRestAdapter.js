const RestAdapter = require('lib/api/RestAdapter')

const createRestAdapter = ({ host }) => {
  return new RestAdapter({
    host: host,
    beforeSend(jqXHR) {
      let token = localStorage.getItem('token')
      if (token) {
        let headerValue = `Bearer ${token}`
        jqXHR.setRequestHeader('Authorization', headerValue)
      }
    }
  })
}

module.exports = createRestAdapter
