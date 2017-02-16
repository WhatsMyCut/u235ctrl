module.exports = {
  path: 'reward-fulfillment-setup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/RewardFulfillmentSetup'))
    })
  }
}
