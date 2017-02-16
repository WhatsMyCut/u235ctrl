const React = require('react')
const { Component, PropTypes } = React
const moment = require('moment')
const isMoment = require('lib/unsorted/isMoment')
const DATETIME_FORMAT = 'YYYY-MM-DD hh:mm:ss a'
require('flatpickr')

class DatetimePicker extends Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.flatpickr = this.input.flatpickr({
      allowInput: true,
      enableTime: this.props.defaultTimeOnChange ? false : true,
      wrap: true,
      clickOpens: false, // disable opening calendar by clicking on input
      onChange: (selectedDates, dateStr, instance) => {
        let date = selectedDates[0] || null
        let dnt = this.props.defaultTimeOnChange
        let time = date
        if (dnt && dnt === 'startOfDay') {
          time = new Date(0, 0, 0, 0, 0, 0, 0)
        } else if (dnt && dnt === 'endOfDay') {
          time = new Date(0, 0, 0, 23, 59, 59, 999)
        }
        if (date && dnt) {
          date.setHours(time.getHours())
          date.setMinutes(time.getMinutes())
          date.setSeconds(time.getSeconds())
          date.setMilliseconds(time.getMilliseconds())
          instance.setDate(date)
        }
      }
    })
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  getFormat() {
    return this.props.format || DATETIME_FORMAT
  }

  onChange(event) {
    if (event.target.value) {
      let m = moment(event.target.value, 'YYYY-MM-DD')
      this.props.onChange(m.toISOString())
      this.flatpickr.setDate(m.toISOString())
    } else {
      this.props.onChange(event.target.value)
    }
  }

  render() {
    let value = this.props.value
              ? moment(this.props.value).format(this.getFormat())
              : ''

    return (
      <div className="input-group" ref={elem => this.input = elem} >
        <span className="input-group-btn" data-toggle>
          <button disabled={this.props.readonly} className="btn btn-default" type="button"><span className="glyphicon glyphicon-calendar"></span></button>
        </span>
        <span className="input-group-btn">
          <button
            onClick={() => this.flatpickr.setDate('')}
            disabled={this.props.readonly}
            className="btn btn-default"
            type="button"
          >
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        </span>
        <input
          type='text'
          value={value}
          readOnly={true}
          name={this.props.name}
          onChange={this.onChange}
          disabled={this.props.readonly}
          className="form-control" data-input />
      </div>
    )
  }
}

const MaybeDate = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date),
  isMoment
])

DatetimePicker.propTypes = {
  onChange: PropTypes.func,
  value: MaybeDate,
  // allow disabling display of the timepicker
  disableTime: PropTypes.bool,
  // now, start of day, or end of day
  defaultTimeOnChange: PropTypes.oneOf(['now', 'startOfDay', 'endOfDay']),
  format: PropTypes.string,
  name: PropTypes.string,
  readonly: PropTypes.bool
}

module.exports = DatetimePicker
