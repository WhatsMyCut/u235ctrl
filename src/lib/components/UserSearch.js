const React = require('react')
const { Component, PropTypes } = React
const _ = require('lodash')
const ProgramLookup = require('lib/components/ProgramLookup')
const UserLookup = require('lib/components/UserLookup')
const UserMethodLookup = require('lib/components/UserMethodLookup')
const DatetimePicker = require('lib/components/DatetimePicker')
const Button = require('lib/components/Button')
const CountryCodeSelect = require('lib/components/CountryCodeSelect')
const RegionSelect = require('lib/components/RegionSelect')

class UserSearch extends Component {
  constructor(props) {
    super()
    // internal state
    // props always overwrite internal state
    // props should only come from URL query parameters
    this.state = Object.assign({
      id: '',
      isValid: '',
      firstName: '',
      lastName: '',
      email: '',
      primaryPhone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      postalCode: '',
      country: '',
      company: '',
      receivedFrom: '',
      receivedTo: '',
    }, props.values)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickSearch = this.onClickSearch.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let values = Object.assign({}, this.state, nextProps.values)
    this.setState(values)
  }

  onClickSearch() {
    this.props.onClickSearch(this.state)
  }

  onChangeField(fieldName, event) {
    this.setState({ [fieldName]: event.target.value })
  }

  onChangeDatepicker(fieldName, value) {
    let v = value
    if (value) { v = value.toISOString() }
    this.setState({ [fieldName]: v })
  }

  onChangeLookup(fieldName, value) {
    this.setState({ [fieldName]: value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.onClickSearch()
  }

  render() {
    // handle using null values instead of empty string for lookup components
    let programId = parseInt(this.state.programId, 10)
    let programIdNum = programId
    if (!_.isFinite(programId)) {
      programId = ''
      programIdNum = null
    }

    let submissionMethodId = parseInt(this.state.submissionMethodId, 10)
    if (!_.isFinite(submissionMethodId)) {
      submissionMethodId = null
    }

    let userId = parseInt(this.state.userId, 10)
    if (!_.isFinite(userId)) {
      userId = null
    }

    return (
      <div className="UserSearch">
        <form onSubmit={this.onSubmit}>
          <p>Search Users</p>

          <div className="form-group">
            <label className="control-label">User</label>
            <UserLookup
              value={userId}
              onChange={this.onChangeLookup.bind(this, 'userId')} />
          </div>

          <div className="form-group">
            <label className="control-label">Program ID</label>
            <input
              value={programId}
              name="programId"
              type="text"
              onChange={this.onChangeField.bind(this, 'programId')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Program Name</label>
            <ProgramLookup
              value={programIdNum}
              onChange={this.onChangeLookup.bind(this, 'programId')}
              readonly={false} />
          </div>

          <div className="form-group">
            <label className="control-label">User ID</label>
            <input
              value={this.state.id || ''}
              name="submissionId"
              type="text"
              onChange={this.onChangeField.bind(this, 'id')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Entry Method</label>
            <UserMethodLookup
              value={submissionMethodId}
              onChange={this.onChangeLookup.bind(this, 'submissionMethodId')} />
          </div>

          <div className="form-group">
            <label className="control-label">Result</label>
            <select
              value={this.state.isValid}
              className="form-control input-sm"
              onChange={this.onChangeField.bind(this, 'isValid')}>
              <option value="">-</option>
              <option value="true">Valid</option>
              <option value="false">Invalid</option>
            </select>
          </div>

          <div className="form-group">
            <label className="control-label">First name</label>
            <input
              name="firstName"
              type="text"
              value={this.state.firstName || ''}
              onChange={this.onChangeField.bind(this, 'firstName')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Last name</label>
            <input
              name="lastName"
              type="text"
              value={this.state.lastName || ''}
              onChange={this.onChangeField.bind(this, 'lastName')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Email</label>
            <input
              name="email"
              type="text"
              value={this.state.email || ''}
              onChange={this.onChangeField.bind(this, 'email')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Phone</label>
            <input
              name="primaryPhone"
              type="text"
              value={this.state.primaryPhone || ''}
              onChange={this.onChangeField.bind(this, 'primaryPhone')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Address Line 1</label>
            <input
              value={this.state.addressLine1 || ''}
              name="addressLine1"
              type="text"
              onChange={this.onChangeField.bind(this, 'addressLine1')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Address Line 2</label>
            <input
              value={this.state.addressLine2 || ''}
              name="addressLine2"
              type="text"
              onChange={this.onChangeField.bind(this, 'addressLine2')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">City</label>
            <input
              value={this.state.city || ''}
              name="city"
              type="text"
              onChange={this.onChangeField.bind(this, 'city')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Region (State)</label>
            <RegionSelect
              value={this.state.region || ''}
              className="form-control input-sm"
              onChange={this.onChangeField.bind(this, 'region')} />
          </div>

          <div className="form-group">
            <label className="control-label">Postal Code</label>
            <input
              value={this.state.postalCode || ''}
              name="postalCode"
              type="text"
              onChange={this.onChangeField.bind(this, 'postalCode')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Country</label>
            <CountryCodeSelect
              value={this.state.country || ''}
              className="form-control input-sm"
              onChange={this.onChangeField.bind(this, 'country')} />
          </div>

          <div className="form-group">
            <label className="control-label">Company</label>
            <input
              value={this.state.company || ''}
              name="company"
              type="text"
              onChange={this.onChangeField.bind(this, 'company')}
              className="form-control input-sm" />
          </div>

          <div className="form-group">
            <label className="control-label">Received From</label>
            <DatetimePicker
              defaultTimeOnChange='startOfDay'
              format='MM/DD/YYYY h:mm:ss a'
              value={this.state.receivedFrom}
              onChange={this.onChangeDatepicker.bind(this, 'receivedFrom')} />
          </div>

          <div className="form-group">
            <label className="control-label">Received To</label>
            <DatetimePicker
              defaultTimeOnChange='endOfDay'
              format='MM/DD/YYYY h:mm:ss a'
              value={this.state.receivedTo}
              onChange={this.onChangeDatepicker.bind(this, 'receivedTo')} />
          </div>

          <div className="form-group">
            <Button
              className="UserSearch-searchBtn"
              onClick={this.onClickSearch}
              type="submit"
              buttonType="primary">Search</Button>
          </div>
        </form>
      </div>
    )
  }
}

UserSearch.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    programId: PropTypes.string,
    submissionMethodId: PropTypes.string,
    isValid: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    primaryPhone: PropTypes.string,
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    region: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    company: PropTypes.string,
    receivedFrom: PropTypes.string,
    receivedTo: PropTypes.string,
  }).isRequired,
  onClickSearch: PropTypes.func.isRequired
}

module.exports = UserSearch
