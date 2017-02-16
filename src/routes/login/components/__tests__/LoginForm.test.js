const React = require('react')
const LoginForm = require('../LoginForm')
const { shallow } = require('enzyme')

describe('LoginForm', () => {
  it('calls onChange and onSubmit props when inputs are changed or the form is submitted', () => {
    let onSubmit = jest.fn()
    let onChangeEmail = jest.fn()
    let onChangePassword = jest.fn()
    let email = 'jeff.lebowski@example.com'
    let password = 'bowling'

    let wrapper = shallow(
      <LoginForm
        email={email}
        password={password}
        onSubmit={onSubmit}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword} />
    )


    let emailInput = wrapper.find('.LoginForm-emailInput')
    let passwordInput = wrapper.find('.LoginForm-passwordInput')
    let submitButton = wrapper.find('.LoginForm-submitButton')

    // the input are set to the corresponding prop values
    expect(emailInput.prop('value')).toEqual(email)
    expect(passwordInput.prop('value')).toEqual(password)

    // change events are called on passed in prop methods
    emailInput.simulate('change', { target: { value: email } })
    expect(onChangeEmail.mock.calls.length).toEqual(1)


    passwordInput.simulate('change', { target: { value: password } })
    expect(onChangePassword.mock.calls.length).toEqual(1)

    submitButton.simulate('click')
    expect(onSubmit.mock.calls.length).toEqual(1)
  })
})
