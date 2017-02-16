const React = require('react')
const { PropTypes, Component } = React

class CountryCodeSelect extends Component {
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
        <option value="">-</option>
        <option value="US">United States</option>
        <option value="CN">Canada</option>
        <option value="MX">Mexico</option>
      </select>
    )
  }
}

CountryCodeSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool
}

module.exports = CountryCodeSelect
