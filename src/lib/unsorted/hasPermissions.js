const Permissions = require('lib/constants/Permissions')

let hasPermissions = (options) => {
  let { needs, permissions, testNoPermissions} = options

  //hook to make testing no permissions easier
  if (testNoPermissions === true) { return false }

  if (!permissions) { return false }

  if (Permissions.SYSTEM in permissions) {
    return true
  }

  if (Array.isArray(needs)) {
    return needs.every(neededPerm => {
      return neededPerm in permissions
    })
  }

  if (typeof needs === 'string') {
    return needs in permissions
  }
}

module.exports = hasPermissions
