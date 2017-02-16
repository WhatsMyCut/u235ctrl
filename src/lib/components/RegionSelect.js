const React = require('react')
const { PropTypes, Component } = React
const _ = require('lodash')
const USStates = require('lib/constants/USStates')
const FormUtils = require('lib/unsorted/FormUtils')

class RegionSelect extends Component {
  shouldComponentUpdate(nextProps) {
    let props = this.props
    return (
      props.value !== nextProps.value ||
      props.required !== nextProps.required
    )
  }

  render() {
    let props = this.props

    return (
      <select
        className="form-control"
        value={props.value}
        required={props.required}
        disabled={props.readonly}
        onChange={props.onChange}>
        {FormUtils.prependNullOption(_.map(USStates, (state, abbr) => (
          <option key={abbr} value={abbr}>{state.name}</option>
        )))}
      </select>
    )
  }
}

RegionSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool
}

module.exports = RegionSelect
