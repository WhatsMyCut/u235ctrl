const React = require('react')
const { Component, PropTypes } = React

class ModalBody extends Component {
  render() {
    return (
      <div className="modal-body">
        {this.props.children}
      </div>
    )
  }
}

ModalBody.propTypes = {
  children: PropTypes.node
}

module.exports = ModalBody
