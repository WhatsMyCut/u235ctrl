const Actions = require('../Actions')

describe('Actions', () => {

  describe('_user', () => {
    it('throws an error on access if Actions.setUser hasnt been called', () => {
      expect(
        () => Actions._user
      ).toThrow()
      expect(() => {
        Actions.setUser({})
        Actions._user
      }).not.toThrow()
    })
  })

  describe('setUser', () => {
    it('sets _user interally in the module to be used for making http requests', () => {
      let user = { findAll() {} }
      Actions.setUser(user)
      expect(Actions._user).toBe(user)
    })
  })

  describe('createNotification', () => {
    it('dispatches an notification object', () => {
      let dispatch = jest.fn()
      let callback = Actions.createNotification({ content: 'notification' })
      callback(dispatch)
      let createAction = dispatch.mock.calls[0][0]
      expect(createAction.type).toEqual('CREATE_NOTIFICATION')
    })

    it('automatically creates a dismiss action after a timeout', () => {
      let dispatch = jest.fn()
      let callback = Actions.createNotification({ content: 'notification' })
      callback(dispatch)
      jest.runOnlyPendingTimers()
      let dismissAction = dispatch.mock.calls[1][0]
      expect(dispatch.mock.calls.length).toEqual(2)
      expect(dismissAction.type).toEqual('DISMISS_NOTIFICATION')
    })
  })

  describe('dismissNotification', () => {
    it('throws an error when it receives null or undefined', () => {
      expect(() => {
        Actions.dismissNotification()
      }).toThrow()
      expect(() => {
        Actions.dismissNotification(null)
      }).toThrow()
    })

    it('returns a dismiss action to be dispatched', () => {
      let action = Actions.dismissNotification(1)
      expect(action).toEqual({
        type: 'DISMISS_NOTIFICATION',
        id: 1
      })
    })
  })
})
