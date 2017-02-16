'use strict'
const React = require('react')
const moment = require('moment')
const _ = require('lodash')

let FormUtils = function() {}

FormUtils.prototype.valueLookup = (ary, val) => {
  let obj = _.find(ary, o => { return o.id === val } )
  return obj ? obj.name : ''
}

FormUtils.prototype.arrayToSelectOptions = (ary) => {
  return _.map(ary, obj => <option key={obj.id} value={obj.id}>{obj.name}</option>)
}

FormUtils.prototype.prependNullOption = (ary) => {
  ary.unshift(<option key={'unselected'} value="">{"-"}</option>)
  return ary
}

FormUtils.prototype.formatDate = (date, format = 'MM/DD/YYYY', forceUTC = false) => {
  if (moment.isMoment(date)) {
    return forceUTC ? date.utc().format(format) : date.format(format)
  } else if (date) {
    return forceUTC ? moment(date).utc().format(format) : moment(date).format(format)
  } else {
    return 'No date set'
  }
}

FormUtils.prototype.yesOrNoFromBool =  (val) => {
  let selection = FormUtils.prototype.valueLookup([{id: true, name: 'Yes'}, {id: false, name: 'No'}], val)
  return selection || 'No'
}

FormUtils.prototype.activeOrInactive = (val) => {
  return val ? 'Active' : 'Inactive'
}

module.exports = new FormUtils()
