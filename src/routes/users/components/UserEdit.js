const React = require('react')
const { Component, PropTypes } = React
const { connect } = require('react-redux')
const withRouter = require('react-router/lib/withRouter')
const UserForm = require('./UserForm')
const Actions = require('lib/actions/Actions')
const ContentContainer = require('lib/components/ContentContainer')
const Button = require('lib/components/Button')
const PageHeading = require('lib/components/PageHeading')
const _ = require('lodash')

const isStringTrueOrBoolTrue = (v) => {
  return v === 'true' || v === true
}

class UserEdit extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      formValues: {
        id: '',
        name: '',
        shortName: '',
        active: true,
        createdAt: '',
        updatedAt: '',
        externalLink: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    if (this.getUserId() !== nextProps.routeParams.userId) {
      this.fetchExistingUserInfo(nextProps.routeParams.userId)
    } else if (this.state.user) {
      this.setUserFormValues()
    }
  }

  getUserId() {
    return this.props.routeParams.userId
  }

  setUserFormValues() {
    let user = this.state.user
    if (user) {
      this.setState({
        formValues: {
          id: user.id,
          name: user.name,
          shortName: user.shortName,
          umbrellaId: user.umbrellaId,
          verticalId: user.verticalId,
          active: user.active === true,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          userFundsRefund: user.userFundsRefund === true,
          externalLink: 'https://example.com/383929198338494928'
        }
      })
    }
  }

  fetchExistingUserInfo(userId) {
    let { dispatch } = this.props

    dispatch(Actions.fetchUserById(userId)).then(user => {
      // transform the user to form values
      this.setState({
        user: user
      })
      this.setUserFormValues()
    })

  }

  componentDidMount() {
    let { routeParams, dispatch } = this.props

    dispatch(Actions.fetchVerticals())
    dispatch(Actions.fetchUmbrellas())

    if (routeParams.userId) {
      this.fetchExistingUserInfo(routeParams.userId)
    }

  }

  isEditMode() {
    return this.props.location.pathname.endsWith('edit') || this.props.location.pathname.endsWith('new')
  }

  onEdit(event) {
    event.preventDefault()
    let { router, routeParams } = this.props
    router.push(`/users/${routeParams.userId}/edit`)
  }

  onCancel(event) {
    event.preventDefault()
    let { router, routeParams } = this.props

    if (routeParams.userId) {
      router.push(`/users/${routeParams.userId}/view`)
    } else {
      router.push('/users/')
    }
  }

  onSubmit(event) {
    event.preventDefault()
    let {
      router,
      dispatch,
      routeParams,
    } = this.props
    let { formValues } = this.state
    let userId = routeParams.userId

    dispatch(Actions.saveUser({
      user: {
        id: userId,
        name: formValues.name,
        shortName: formValues.shortName || '',
        active: isStringTrueOrBoolTrue(formValues.active),
        umbrellaId: formValues.umbrellaId,
        verticalId: formValues.verticalId,
        userFundsRefund: isStringTrueOrBoolTrue(formValues.userFundsRefund)
      }
    })).then(savedUser => {
      this.setState({user: savedUser })
      dispatch(Actions.createNotification({ content: 'User Saved' }))
      router.push(`/users/${savedUser.id}/view`)
    }).catch(() => {
      this.setState({ isSaving: false })
      dispatch(Actions.createNotification({ content: 'Error saving user', type: 'danger' }))
    })
  }

  onFormChange(formValues) {
    this.setState({ formValues })
  }

  render() {
    let editMode = this.isEditMode()

    let saveAndCancelButtons = (
      <div className='btn-toolbar'>
        {!editMode &&
          <Button
            type="submit"
            buttonType='primary'
            onClick={this.onEdit}><span className="glyphicon glyphicon-pencil"></span> {'Edit'}
          </Button>
        }
        {editMode &&
          <Button
            type="submit"
            buttonType='submit'
            disabled={this.state.isSaving}
            onClick={this.onSubmit}><span className="glyphicon glyphicon-ok"></span>&nbsp;{'Save'}
          </Button>
        }
        {editMode &&
          <Button
            disabled={this.state.isSaving}
            buttonType='cancel'
            onClick={this.onCancel}><span className="glyphicon glyphicon-remove"></span>&nbsp;{'Cancel'}
          </Button>
        }
      </div>
    )
    let pageTitle = _.get(this.state, 'user.name', 'User Setup')
    return (
      <ContentContainer>
        <PageHeading
          title={pageTitle}
          breadcrumbItems={[
            {
              url: '#/users',
              text: 'Users'
            },
            {
              text: pageTitle
            }
          ]}>
          {saveAndCancelButtons}
        </PageHeading>

        <br/>
        <form onSubmit={this.onSubmit}>
          <div className='UserEdit-userInfoContainer'>
            <UserForm
              umbrellas={this.props.umbrellas}
              verticals={this.props.verticals}
              formValues={this.state.formValues}
              editMode={editMode}
              onChange={this.onFormChange} />
          </div>


        </form>
      </ContentContainer>
    )
  }
}

UserEdit.propTypes = {
  routeParams: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  umbrellas: PropTypes.object,
  verticals: PropTypes.object,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    verticals: state.verticals,
    umbrellas: state.umbrellas
  }
}

module.exports = connect(mapStateToProps)(withRouter(UserEdit))
