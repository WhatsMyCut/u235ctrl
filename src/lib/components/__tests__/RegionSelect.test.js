const React = require('react')
const RegionSelect = require('../RegionSelect')
const { shallow } = require('enzyme')

describe('RegionSelect', () => {
  it('is a contains the list of regions for a submission form', () => {
    let onChange = jest.fn()
    let wrapper = shallow(<RegionSelect onChange={onChange}/>)
    expect(wrapper.contains(
      <option value="">-</option>
    )).toEqual(true)
    expect(wrapper.contains(
      <option value="AL">Alabama</option>
    )).toEqual(true)
    expect(wrapper.contains(
      <option value="WY">Wyoming</option>
    )).toEqual(true)
  })
})
