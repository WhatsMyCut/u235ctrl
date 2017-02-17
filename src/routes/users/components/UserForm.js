const React = require('react')
const { Component, PropTypes } = React
const GridRow = require('lib/components/GridRow')
const GridItem = require('lib/components/GridItem')
const FormUtils = require('lib/unsorted/FormUtils')
const _ = require('lodash')
const cx = require('classnames')

const isFiniteGreaterThanZero = (v) => {
  v = parseInt(v, 10)
  return isFinite(v) && v > 0
}

const isStringLengthGreaterThanZero = (v) => {
  return typeof v === 'string' && v.length > 0
}

let validations = {
  name: isStringLengthGreaterThanZero,
  verticalId: isFiniteGreaterThanZero
}

class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      isFormValid: false,
      isFormDirty: false,
      dirtyFields: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    let isFormValid = this.isFormValid(nextProps.formValues, validations)
    this.setState({ isFormValid })
  }

  onFieldChange(fieldName, event) {
    let formValues = Object.assign({}, this.props.formValues, {
      [fieldName]: event.target.value
    })
    let dirtyFields = Object.assign({}, this.state.dirtyFields, { [fieldName]: true })
    this.setState({ isFormDirty: true, dirtyFields })
    this.props.onChange(formValues)
  }

  isFormValid(formValues, validations) {
    return _.every(validations, (validator, fieldName) => {
      let fieldValue = formValues[fieldName]
      if (_.has(formValues, fieldName) === false) {
        return true
      }

      let valid = validator(fieldValue)
      return valid
    })
  }

  isFieldValid(fieldName) {
    let formValues = this.props.formValues
    let hasValidation = fieldName in formValues && fieldName in validations
    if (hasValidation) {
      let fieldValue = formValues[fieldName]
      return validations[fieldName](fieldValue)
    }

    return true
  }

  isFieldDirty(fieldName) {
    return fieldName in this.state.dirtyFields
  }

  render() {
    let {
      formValues,
      editMode
    } = this.props

    let viewMode = !editMode

    let getFormGroupClasses = (fieldName) => {
      return cx({
        'form-group': true,
        'has-error': !this.isFieldValid(fieldName) && this.isFieldDirty(fieldName)
      })
    }
    let isUserIdDisplayed = _.isNumber(formValues.id)
    return (
      <div className="UserForm">
        <GridRow>
          <GridItem width={6}>
            <div className={getFormGroupClasses('name')}>
              <label className="control-label">User Name*</label>
              <br/>
              {viewMode && <span className="view-control">{formValues.name}</span>}
              {editMode && <input
                autoFocus={true}
                onChange={this.onFieldChange.bind(this, 'name')}
                value={formValues.name}
                type="text"
                name="name"
                className="form-control" />
              }
            </div>
          </GridItem>
          {isUserIdDisplayed && <GridItem width={6}>
            <div className="form-group">
              <label className="control-label">User ID</label>
              <br/>
              <span className="view-control">{formValues.id}</span>
            </div>
          </GridItem>}
        </GridRow>
        <GridRow>
          <GridItem width={6}>
            <div className="form-group">
              <label className="control-label">Create Date</label>
              <br/>
              <span className="view-control">{FormUtils.formatDate(formValues.createdAt, 'MM/DD/YYYY h:mm:ss a') }</span>
            </div>
          </GridItem>
          <GridItem width={6}>
            <div className="form-group">
              <label className="control-label">Last Update</label>
              <br/>
              <span className="view-control">{FormUtils.formatDate(formValues.updatedAt, 'MM/DD/YYYY h:mm:ss a')}</span>
            </div>
          </GridItem>
        </GridRow>
        <GridRow>
          <GridItem width={6}>
            <div className="form-group">
              <label className="control-label">User Status</label>
              <br/>
              {viewMode && <span className="view-control">{FormUtils.valueLookup([{id: true, name: 'Active'},{id: false, name: 'Inactive'}], formValues.active) }</span>}
              {editMode && <select
                onChange={this.onFieldChange.bind(this, 'active')}
                value={formValues.active}
                className="form-control"
                name="active">
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              }
            </div>
          </GridItem>
        </GridRow>
      </div>
    )
  }
}

UserForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  verticals: PropTypes.object,
  umbrellas: PropTypes.object,
  editMode: PropTypes.bool
}

module.exports = UserForm
