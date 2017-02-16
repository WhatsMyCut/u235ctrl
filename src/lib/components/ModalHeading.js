const React = require('react')
const { Component, PropTypes } = React

class ModalHeading extends Component {
  render() {
    return (
      <div className="ModalHeading">
        <div className="clearfix">
          <h5 className="ModalHeading-heading">{this.props.title}</h5>
          <div className="ModalHeading-content">
            <span onClick={this.props.onClickClose} className="ModalHeading-closeLink">
              <span className="glyphicon glyphicon-remove"></span>
              <span>Close</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

ModalHeading.propTypes = {
  title: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired
}

module.exports = ModalHeading
