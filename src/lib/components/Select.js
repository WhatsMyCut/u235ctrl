const React = require('react')
const { Component, PropTypes } = React

class MultipleSelect extends Component {

  handleChange(event) {
    let form = this.props.form
    let formValues = Object.assign({}, form.props.formValues, {
      [this.props.fieldName]: form.props.formValues[this.props.fieldName].concat([event.target.value])
    })
    let dirtyFields = Object.assign({}, form.state.dirtyFields, { [this.props.fieldName]: true })
    form.setState({ isFormDirty: true, dirtyFields })
    form.onChange(formValues)
  }

  render() {
    return (
      <select
        onChange={this.handleChange.bind(this)}
        value={this.props.val}
        className="form-control"
        name={this.props.fieldName + '[]'}>{this.props.options}</select>
    )
  }
}

MultipleSelect.propTypes = {
  fieldName: PropTypes.string,
  options: PropTypes.array,
  val: PropTypes.number,
  form: PropTypes.object
}

module.exports = MultipleSelect
