const React = require('react')
const { Component, PropTypes } = React
const Button = require('lib/components/Button')

class LoginForm extends Component {
  render() {
    let {
      email,
      password,
      onSubmit,
      onChangeEmail,
      onChangePassword
    } = this.props

    let canSubmit = !!email && !!password

    return (
      <div className="LoginForm-container">
        <form className="LoginForm" onSubmit={onSubmit}>
          <h3>Sign in</h3>
          <div className="LoginForm-emailContainer form-group">
            <label className="control-label">Username</label>
            <input
              onChange={onChangeEmail}
              placeholder={'username'}
              type="email"
              className="LoginForm-emailInput form-control"
              value={email} />
          </div>
          <div className="LoginForm-passwordContainer form-group">
            <label className="control-label">Password</label>
            <input
              onChange={onChangePassword}
              placeholder={'Password'}
              type="password"
              className="LoginForm-passwordInput form-control"
              value={password} />
          </div>
          <div className="LoginForm-submitContainer">
            <Button
              disabled={!canSubmit}
              buttonType="primary"
              onClick={onSubmit}
              className="LoginForm-submitButton"
              type="submit">{'Submit'}</Button>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
}

module.exports = LoginForm
