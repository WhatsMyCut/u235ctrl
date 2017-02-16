let getState = () => ({})

let dispatch = (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  } else {
    return action
  }
}

module.exports = dispatch
