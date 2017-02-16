const React = require('react')
const CountryCodeSelect = require('../CountryCodeSelect')
const { shallow } = require('enzyme')

describe('CountryCodeSelect', () => {
  it('is a contains the list of country codes for a submission form', () => {
    let onChange = jest.fn()
    let wrapper = shallow(<CountryCodeSelect onChange={onChange}/>)
    expect(wrapper.contains(
      <option value="">-</option>
    )).toEqual(true)
    expect(wrapper.contains(
      <option value="MX">Mexico</option>
    )).toEqual(true)
  })
})
