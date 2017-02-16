const React = require('react')
const { Component, PropTypes } = React
const { connect } = require('react-redux')
const withRouter = require('react-router/lib/withRouter')
const Actions = require('lib/actions/Actions')
const ContextualSidebar = require('lib/components/ContextualSidebar')
const hasPermissions = require('lib/unsorted/hasPermissions')
const _ = require('lodash')

class UserSidebar extends Component {
  constructor() {
    super()

    this.state = {
      userId: '',
      userName: ''
    }
  }

  getUserId() {
    return this.props.params.userId
  }

  componentWillReceiveProps(nextProps) {
    if (this.getUserId() !== nextProps.params.userId) {
      this.fetchExistingUserInfo(nextProps.params.userId)
    }
  }

  componentDidMount() {
    let { params } = this.props

    if (params.userId) {
      this.fetchExistingUserInfo(params.userId)
    }
  }

  fetchExistingUserInfo(userId) {
    let { dispatch } = this.props

    dispatch(Actions.fetchUserById(userId)).then(user => {
      this.setState({
        userId: user.id,
        userName: user.name
      })

      return user
    })
  }

  render() {
    let userId = this.getUserId()


    let links = _.compact([
      {
        href: `/users/${userId}/view`,
        content: 'Basic Information'
      },
    ])

    return (
      <ContextualSidebar name={`${this.state.userName}`} links={links} />
    )
  }
}

UserSidebar.propTypes = {
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  permissions: PropTypes.object
}

const mapStateToProps = (state) => {
  return { permissions: state.currentUserPermissionsHash }
}

module.exports = connect(mapStateToProps)(withRouter(UserSidebar))
