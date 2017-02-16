const React = require('react')
const { Component, PropTypes } = React
const $ = require('jquery')
// ensure the bootstrap js is included for $.modal
require('lib/unsorted/bootstrap')

class Modal extends Component {
  constructor() {
    super()
    this.onClickClose = this.onClickClose.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setModalProps(nextProps)
  }

  onClickClose() {
    if (this.props.onClickClose) {
      this.props.onClickClose()
    }
  }

  componentDidMount() {
    this.setModalProps(this.props)
    $(this.modal).on('hidden.bs.modal', this.onClickClose)
  }

  componentWillUnmount() {
    $(this.modal).modal('hide').removeData()
    $(this.modal).off('hidden.bs.modal', this.onClickClose)
  }

  setModalProps(props) {
    if (props.open && !props.inline) {
      $(this.modal).modal('show')
    } else {
      $(this.modal).modal('hide')
    }
  }

  render() {
    let modalClass = this.props.inline ? 'modal-inline' : 'modal'
    let size = this.props.size || 'md'
    let classes = 'modal-dialog modal-' + size
    return (
      <div className={modalClass} tabIndex="-1" role="dialog" ref={elem => this.modal = elem}>
        <div className={classes} role="document">
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  inline: PropTypes.bool,
  size: PropTypes.string,
  open: PropTypes.bool,
  onClickClose: PropTypes.func,
  children: PropTypes.node.isRequired
}

module.exports = Modal
