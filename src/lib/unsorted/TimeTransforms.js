const moment = require('moment')

// get the UTC offset of the timezone
// then manually set the offset of the new time
// and keep the same time to ensure `toISOString` responds correctly
const toTimeZoneTime = (m, tzStr) => {
  // Don't mutate the value by wrapping it in a moment
  if (!m) { return m }
  if (typeof m === 'string' || m instanceof Date) {
    m = moment(m)
  }
  let offset = m.clone().tz(tzStr).utcOffset()
  return m.clone().utcOffset(offset, true)
}

module.exports = {
  toTimeZoneTime
}
