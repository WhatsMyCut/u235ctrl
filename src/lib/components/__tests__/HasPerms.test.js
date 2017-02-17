const React = require('react')
const Permissions = require('lib/constants/Permissions')
const HasPerms = require('../HasPerms')
const { mount } = require('enzyme')
const { createStore } = require('redux')
const { Provider } = require('react-redux')
const reducer = (state = {}) => state

describe('HasPerms', () => {
  describe('valid permissions', () => {
    it('takes a p prop as a string', () => {
      const store = createStore(reducer, {
        currentUserPermissionsHash: { 'CAMEL.*': true }
      })

      let wrapper = mount(
        <Provider store={store}>
          <HasPerms needs="CAMEL.*">
            <span>Thread the needle</span>
          </HasPerms>
        </Provider>
      )

      expect(wrapper.text()).toContain('Thread the needle')
    })

    it('takes a p prop as an array', () => {
      const store = createStore(reducer, {
        currentUserPermissionsHash: { 'CAMEL.*': true }
      })

      let wrapper = mount(
        <Provider store={store}>
          <HasPerms needs={['CAMEL.*']}>
            <span>Thread the needle</span>
          </HasPerms>
        </Provider>
      )

      expect(wrapper.text()).toContain('Thread the needle')
    })

    it('renders regardless of other permissions if the user has the system permission', () => {
      const store = createStore(reducer, {
        currentUserPermissionsHash: { [Permissions.SYSTEM]: true }
      })

      let wrapper = mount(
        <Provider store={store}>
          <HasPerms needs={['CAMEL.*']}>
            <span>Thread the needle</span>
          </HasPerms>
        </Provider>
      )

      expect(wrapper.text()).toContain('Thread the needle')
    })
  })

  describe('invalid permissions', () => {
    it('wont render children if the user doesnt have the necessary permissions', () => {
      const store = createStore(reducer, {
        currentUserPermissionsHash: {}
      })

      let wrapper = mount(
        <Provider store={store}>
          <HasPerms needs="CAMEL.*">
            <span>Thread the needle</span>
          </HasPerms>
        </Provider>
      )

      expect(wrapper.html()).toEqual(null)
    })
  })
})
