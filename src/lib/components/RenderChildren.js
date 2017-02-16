const React = require('react')
const { Component, PropTypes } = React

class RenderChildren extends Component {
  render() {
    return this.props.children
  }
}

RenderChildren.propTypes = {
  children: PropTypes.node
}

module.exports = RenderChildren
