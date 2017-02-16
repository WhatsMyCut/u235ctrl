const ActionTypes = require('lib/actions/ActionTypes')
const _ = require('lodash')

const getUserIdFromToken = (token) => {
  let [, bodyEncodedJSON] = token.split('.')
  let bodyJSON = atob(bodyEncodedJSON)
  let body = JSON.parse(bodyJSON)
  let userId = body.id
  return userId
}

let idCounter = 0
const generateId = () => ++idCounter

// Async actions should return a function that takes `dispatch`
// as its only argument and should be called like dispatch(Actions.login(email, password)) from a component.
// This allows the integration with redux-thunk to pass the dispatch method to the action
// and dispatch in async, which is not supported by redux itself out-of-the-box
const Actions = {
  // provide messaging for the case where Actions methods are
  get _user() {
    throw new Error(
      'An http user has not been set for Actions. ' +
      'Create a user and set it using Actions.setUser(user). '
    )
  },

  setUser(user) {
    // delete the getter that provides messaging
    delete this._user
    this._user = user
  },

  logout() {
    return { type: ActionTypes.USER_LOGOUT }
  },

  login(email, password) {
    return dispatch => {
      return this._user.AuthToken.create({ email, password }).then(res => {
        return dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, token: res.token })
      })
    }
  },

  createNotification({ content, isDismissable = true, type = 'success' }) {
    let id = generateId()

    return dispatch => {
      // auto-dismiss the notification after a timeout
      setTimeout(() => {
        dispatch(this.dismissNotification(id))
      }, 5000)

      return dispatch({
        type: ActionTypes.CREATE_NOTIFICATION,
        notification: { id, content, isDismissable, type }
      })
    }
  },

  dismissNotification(id) {
    if (id === undefined || id === null) {
      throw new Error('Invalid notification id')
    }
    return {
      type: ActionTypes.DISMISS_NOTIFICATION,
      id: id
    }
  },

  fetchInitialAppData() {
    return dispatch => {
      let token = localStorage.getItem('token')

      if (token) {
        let userId = getUserIdFromToken(token)
        return Promise.all([
          dispatch(this.fetchUser(userId)),
          dispatch(this.fetchUserPermissions(userId))
        ]).then(([user, permissions]) => {
          let mapped = permissions.map(p => `${p.resource}.${p.action}`)

          return dispatch({
            type: ActionTypes.INITIAL_APP_DATA,
            currentUser: user,
            currentUserPermissions: mapped,
          })
        })
      }

      return Promise.reject(new Error('No token available'))
    }
  },

  fetchCurrentUser() {
    return dispatch => {
      let token = localStorage.getItem('token')
      if (token) {
        let userId = getUserIdFromToken(token)
        return dispatch(this.fetchUser(userId))
      }
      return Promise.reject(new Error('No token available'))
    }
  },

  fetchUser(userId) {
    return () => this._user.Users.findOne(userId)
  },

  saveUser(user) {
    return () => {
      if (user.id) {
        return this._user.Users.update(user.id, user)
      } else {
        return this._user.Users.create(user)
      }
    }
  },

  fetchUserPermissions(userId) {
    return () => this._user.raw.request(`/users/${userId}/permissions`, 'GET', {})
  },

  sendPasswordReset(email) {
    return this._user.raw.request('/users/reset-code', 'PUT', {
      data: { email }
    })
  },

  sendChangePassword({ email, password, confirmPassword, resetCode }) {
    return this._user.raw.request('/users/password', 'PUT', {
      data: { email, password, confirmPassword, resetCode }
    })
  },

  closeSidebar() {
    return { type: ActionTypes.CLOSE_SIDEBAR_EXPANSION }
  },

  invertSidebarExpansion() {
    return { type: ActionTypes.INVERT_SIDEBAR_EXPANSION }
  },

  fetchFields(query = {}) {
    return dispatch => this._user.Fields.findQuery(Object.assign(query, { perPage: 1000 })).then(fields => {
      dispatch({ type: ActionTypes.FETCH_FIELDS_SUCCESS, fields })
      return fields
    })
  },

  fetchFieldGroups(query = {}) {
    return dispatch => this._user.FieldGroups.findQuery(query).then(fieldGroups => {
      dispatch({ type: ActionTypes.FETCH_FIELD_GROUPS_SUCCESS, fieldGroups })
      return fieldGroups
    })
  }
}

module.exports = _.bindAll(Actions, [])
