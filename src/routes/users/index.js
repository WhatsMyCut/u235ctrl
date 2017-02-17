const hasPermissions = require('lib/unsorted/hasPermissions')
const Permissions = require('lib/constants/Permissions')

module.exports = function getRoute(store) {
  return {
    path: 'users',
    indexRoute: {
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./components/UserList'))
        })
      }
    },
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('lib/components/RenderChildren'))
      })
    },
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [{
          path: 'new',
          component: require('./components/UserEdit')
        }, {
          path: ':userId',
          onEnter: (nextState, replace) => {
            let canView = hasPermissions({needs: [Permissions.USERS_READ], permissions: store.getState().currentUserPermissionsHash})
            if (!canView) {
              replace(`/users/${nextState.params.userId}/view`)
            }
          }
        }, {
          path: ':userId/view',
          component: require('./components/UserEdit')
        }, {
          path: ':userId/edit',
          component: require('./components/UserEdit')
        }])
      })
    }
  }
}
