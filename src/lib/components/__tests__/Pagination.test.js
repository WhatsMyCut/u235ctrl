const React = require('react')
const Pagination = require('../Pagination')
const { shallow } = require('enzyme')

let route = '/some/route/somewhere'
let query = {order: 'name', dir: 'desc'}
describe('Pagination', () => {
  it('it renders a Pagination component', () => {
    let wrapper = shallow(<Pagination
      route={route}
      query={query}
      canShowPrevious={true}
      canShowNext={true} />)
    expect(wrapper.find('.pager').length).toEqual(1)
    expect(wrapper.find('.pager .prevPageLink').length).toEqual(1)
    expect(wrapper.find('.pager .nextPageLink').length).toEqual(1)
  })
  it('it renders only a Previous button within the Pagination component', () => {
    let wrapper = shallow(<Pagination
      route={route}
      query={query}
      canShowPrevious={true}
      canShowNext={false} />)
    expect(wrapper.find('.pager .prevPageLink').length).toEqual(1)
    expect(wrapper.find('.pager .nextPageLink').length).toEqual(0)
  })
  it('it renders only a Next button within the Pagination component', () => {
    let query = {order: 'name', dir: 'desc'}
    let wrapper = shallow(<Pagination
      route={'/some/route/somewhere'}
      query={query}
      canShowPrevious={false}
      canShowNext={true} />)
    expect(wrapper.find('.pager .prevPageLink').length).toEqual(0)
    expect(wrapper.find('.pager .nextPageLink').length).toEqual(1)
  })
})
