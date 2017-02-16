const React = require('react')
const { Component, PropTypes } = React

class ModalHeader extends Component {
  render() {
    return (
      <div className="modal-header">
        <button onClick={this.props.onClickClose} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">{this.props.title}</h4>
      </div>
    )
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClickClose: PropTypes.func
}

module.exports = ModalHeader
