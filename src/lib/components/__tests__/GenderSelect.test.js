const React = require('react')
const GenderSelect = require('../GenderSelect')
const { shallow } = require('enzyme')

describe('GenderSelect', () => {
  it('is a contains the list of genders for a submission form', () => {
    let onChange = jest.fn()
    let wrapper = shallow(<GenderSelect onChange={onChange}/>)
    expect(wrapper.contains(
      <option value="">-</option>
    )).toEqual(true)
    expect(wrapper.contains(
      <option value="M">Male</option>
    )).toEqual(true)
    expect(wrapper.contains(
      <option value="F">Female</option>
    )).toEqual(true)
    expect(wrapper.contains(
      <option value="U">Unknown</option>
    )).toEqual(true)
  })
})
