const React = require('react')
const { Component, PropTypes } = React
const { connect } = require('react-redux')
const Select = require('react-select')
const Actions = require('lib/actions/Actions')

class UserLookup extends Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.fetchOptions = this.fetchOptions.bind(this)
  }

  onChange(option) {
    let v = option ? option.value : option
    this.props.onChange(v)
  }

  fetchOptions(input, callback) {
    let { dispatch } = this.props

    dispatch(Actions.fetchUsers({ namesearch: input, perPage: 1000 })).then(items => {
      let options = items.map(i => ({ value: i.id, label: i.name }))
      callback(null, { options: options, complete: true })
    })
  }

  render() {
    return (
      <div className="form-group">
        <Select.Async
          cache={{ /* address react-select #1236 */ }}
          value={this.props.value}
          onChange={this.onChange}
          placeholder={'Search Users'}
          loadOptions={this.fetchOptions}
          disabled={!!this.props.disabled} />
      </div>
    )
  }
}

UserLookup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.number,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

module.exports = connect()(UserLookup)
