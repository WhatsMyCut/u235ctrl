const _ = require('lodash')

// convert nested object to flattened keys and then
// append all the keys and values to a FormData object
// for creating a multipart/form-data request
const toFormData = (obj) => {
  let copy = flatten(obj)
  let fd = new FormData()
  Object.keys(copy).forEach(k => {
    let v = copy[k]
    fd.append(k, v)
  })
  return fd
}

// flatten the object keys to be correctly formatted for form data
// the form-data module doesn't handle encoding complex objects
const flatten = (obj) => {
  let r = {}

  let f = (obj2, root) => {
    Object.keys(obj2).forEach(k => {
      let v = obj2[k]
      let key
      if (root) {
        key = `${root}[${k}]`
      } else {
        key = k
      }

      if (_.isPlainObject(v) || Array.isArray(v)) {
        f(v, key)
      } else if (_.isDate(v)) {
        r[key] = v.toISOString()
      } else if (v instanceof File) {
        r[key] = v
      } else if (v) {
        r[key] = v.toString()
      }
    })
  }

  f(obj)

  return r
}

module.exports = toFormData
