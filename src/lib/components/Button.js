const React = require('react')
const { Component, PropTypes } = React
const cx = require('classnames')
const _ = require('lodash')

class Button extends Component {
  getClassName() {
    let size = this.props.size || 'md'
    let type = this.props.buttonType || 'default'
    switch (type) {
    case 'submit':
    case 'save':
      type = 'success'
      break
    case 'secondary':
      type = 'info'
      break
    }
    let classes = {
      btn: true,
      [`btn-${type}`]: true,
      [`btn-${size}`]: true
    }

    if (this.props.className) {
      classes[this.props.className] = true
    }

    return cx(classes)
  }

  render() {
    let className = this.getClassName()
    let props = _.omit(this.props, 'buttonType', 'size')

    return <button {...props} className={className}>{props.children}</button>
  }
}

Button.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  buttonType: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

module.exports = Button
