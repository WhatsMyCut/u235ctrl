const React = require('react')
const { Component, PropTypes } = React

class Fieldset extends Component {
  render() {
    return <fieldset>
      <legend>{this.props.name}</legend>
      {this.props.children}
    </fieldset>
  }
}

Fieldset.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
}

module.exports = Fieldset
