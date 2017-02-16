const moment = require('moment')
const isMoment = require('../isMoment')

describe('isMoment', () => {
  it('throws an error if the value is just a Date', () => {
    let props = { startDate: new Date() }
    let err = isMoment(props, 'startDate', 'TestComponent')
    expect(err).toBeTruthy()
  })

  it('does nothing if the value is a moment', () => {
    let props = { startDate: moment() }
    let err = isMoment(props, 'startDate', 'TestComponent')
    expect(err).toEqual(undefined)
  })
})
