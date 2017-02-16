const React = require('react')
const { Component, PropTypes } = React

class ContentContainer extends Component {
  render() {
    return (
      <div className="container">
        { this.props.children }
      </div>
    )
  }
}

ContentContainer.propTypes = {
  children: PropTypes.node
}

module.exports = ContentContainer
