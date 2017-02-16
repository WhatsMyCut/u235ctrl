const moment = require('moment')

// isMoment PropTypes validator
const isMoment = function(props, propName, componentName) {
  if (!moment.isMoment(props[propName])) {
    return new Error(
      'Invalid property `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    )
  }
}

module.exports = isMoment
