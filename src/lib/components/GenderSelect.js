const React = require('react')
const { PropTypes, Component } = React

class GenderSelect extends Component {
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
        disabled={props.readonly}
        required={props.required}
        onChange={props.onChange}>
        <option value="">-</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="U">Unknown</option>
      </select>
    )
  }
}

GenderSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool
}

module.exports = GenderSelect
