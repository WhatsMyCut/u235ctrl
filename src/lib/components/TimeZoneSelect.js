const React = require('react')
const TimeZones = require('lib/constants/TimeZones')

const TimeZoneOptions = TimeZones.map((tz, idx) => {
  return <option key={idx} value={tz.value}>{tz.label}</option>
})

const TimeZoneSelect = (props) => {
  return <select {...props} className='form-control'>{TimeZoneOptions}</select>
}

module.exports = TimeZoneSelect
