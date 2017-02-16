const React = require('react')
const TimeZoneSelect = require('../TimeZoneSelect')
const { shallow } = require('enzyme')

describe('TimeZoneSelect', () => {
  it('displays a list of timezones', () => {
    let wrapper = shallow(<TimeZoneSelect />)
    expect(wrapper.contains(
      <option value="Pacific/Honolulu">Hawaiian</option>
    )).toEqual(true)
  })
})
