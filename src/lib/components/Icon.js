const React = require('react')
const { Component, PropTypes } = React
const _ = require('lodash')

class Icon extends Component {
  getClassName() {
    let iconName = this.props.name
    switch (this.props.name) {
    case 'x':
    case 'cancel':
      iconName = 'remove'
      break
    case 'checkmark':
    case 'check':
    case 'save':
      iconName = 'ok'
      break
    }
    return 'glyphicon glyphicon-' + iconName
  }

  render() {
    let className = this.getClassName()
    let props = _.omit(this.props, 'buttonType', 'size')

    return <span {...props} className={className}></span>
  }
}

Icon.propTypes = {
  name: PropTypes.string
}

module.exports = Icon
