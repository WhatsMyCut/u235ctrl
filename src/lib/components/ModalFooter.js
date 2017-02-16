const React = require('react')
const { Component, PropTypes } = React

class ModalFooter extends Component {
  render() {
    return (
      <div className="modal-footer">
        {this.props.children}
      </div>
    )
  }
}

ModalFooter.propTypes = {
  children: PropTypes.node
}

module.exports = ModalFooter
