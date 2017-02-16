const rootReducer = require('../rootReducer')
const mockLocalStorage = require('lib/test-utils/mockLocalStorage')

describe('rootReducer', () => {
  let initialState

  beforeEach(() => {
    initialState = rootReducer(undefined, { type: '@@INIT' })
  })

  describe('initialState', () => {
    it('returns the inital state when given no state to mutate', () => {
      let state1 = rootReducer(undefined, { type: '@@INIT' })
      expect(state1.sidebar.isExpanded).toBe(false)
      let state2 = rootReducer(state1, { type: 'INVERT_SIDEBAR_EXPANSION' })
      expect(state2).not.toEqual(state1)
      let state3 = rootReducer(undefined, { type: 'UNDEFINED' })
      expect(state1).toEqual(state3)
    })
  })

  describe('actions', () => {
    describe('USER_LOGOUT', () => {
      mockLocalStorage()

      it('unsets `token` in localStorage and returns the initialState', () => {
        spyOn(localStorage, 'removeItem')
        let nextState = rootReducer(initialState, { type: 'USER_LOGOUT' })
        // it returns a state that is not referentially equal
        // but has equal values
        expect(nextState).not.toBe(initialState)
        expect(nextState).toEqual(initialState)
        expect(localStorage.removeItem).toHaveBeenCalledWith('token')
      })
    })

    describe('INVERT_SIDEBAR_EXPANSION', () => {
      it('it reverse the state of sidebar.isExpanded', () => {
        expect(initialState.sidebar.isExpanded).toEqual(false)
        let state1 = rootReducer(initialState, { type: 'INVERT_SIDEBAR_EXPANSION' })
        expect(state1.sidebar.isExpanded).toEqual(true)
        let state2 = rootReducer(state1, { type: 'INVERT_SIDEBAR_EXPANSION' })
        expect(state2.sidebar.isExpanded).toEqual(false)
      })
    })

    describe('USER_LOGIN_SUCCESS', () => {
      mockLocalStorage()

      it('sets the user as authenticated and sets a token in localStorage', () => {
        spyOn(localStorage, 'setItem')
        let nextState = rootReducer(initialState, { type: 'USER_LOGIN_SUCCESS', token: 'ham' })
        expect(nextState.auth.isLoggedIn).toEqual(true)
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ham')
      })
    })

    describe('CREATE_NOTIFICATION and DISMISS_NOTIFICATION', () => {
      it('adds the notification to the notifications key in the store', () => {
        let notification = { id: 5, content: 'Success' }
        let action1 = { type: 'CREATE_NOTIFICATION', notification }
        let state1 = rootReducer(initialState, action1)
        expect(state1.notifications['5']).toEqual(notification)
        let action2 = { type: 'DISMISS_NOTIFICATION', id: 5 }
        let state2 = rootReducer(state1, action2)
        expect(state2.notifications['5']).toEqual(undefined)
      })
    })
  })
})
