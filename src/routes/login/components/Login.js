const React = require('react')
const { PropTypes, Component } = React
const { connect } = require('react-redux')
const Actions = require('lib/actions/Actions')
const withRouter = require('react-router/lib/withRouter')
const LoginForm = require('./LoginForm')

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    let { dispatch, router } = this.props
    dispatch(Actions.login(this.state.email, this.state.password)).then(() => {
      dispatch(Actions.fetchInitialAppData()).then(() => router.push('/'))
    }).catch(jqXHR => {
      if (jqXHR.readyState === 0) {
        // the server isn't running
        dispatch(Actions.createNotification({ content: 'Connection to server refused.', type: 'danger' }))
      } else if (jqXHR.status === 400) {
        dispatch(Actions.createNotification({ content: jqXHR.responseJSON.message, type: 'danger' }))
      }
    })
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value })
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <LoginForm
        email={this.state.email}
        password={this.state.password}
        onSubmit={this.onSubmit}
        onChangeEmail={this.onChangeEmail}
        onChangePassword={this.onChangePassword} />
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
}

module.exports = withRouter(connect()(Login))
