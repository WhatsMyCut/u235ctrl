const { Component, PropTypes } = require('react')
const ReactDOM = require('react-dom')

const isDescendant = (el, target) => {
  if (target !== null) {
    return el === target || isDescendant(el, target.parentNode)
  }
  return false
}

const on = (el, type, callback) => {
  el.addEventListener(type, callback)
}

const off = (el, type, callback) => {
  el.removeEventListener(type, callback)
}

const clickAwayEvents = ['mouseup', 'touchend']
const bind = (callback) => clickAwayEvents.forEach((event) => on(document, event, callback))
const unbind = (callback) => clickAwayEvents.forEach((event) => off(document, event, callback))

class ClickAwayListener extends Component {

  constructor() {
    super()
    this.handleClickAway = this.handleClickAway.bind(this)
  }

  componentDidMount() {
    this.isCurrentlyMounted = true
    if (this.props.onClickAway) {
      bind(this.handleClickAway)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onClickAway !== this.props.onClickAway) {
      unbind(this.handleClickAway)
      if (this.props.onClickAway) {
        bind(this.handleClickAway)
      }
    }
  }

  componentWillUnmount() {
    this.isCurrentlyMounted = false
    unbind(this.handleClickAway)
  }

  handleClickAway(event) {
    if (event.defaultPrevented) {
      return
    }

    if (this.isCurrentlyMounted) {
      const el = ReactDOM.findDOMNode(this)

      if (
        document.documentElement.contains(event.target) &&
        !isDescendant(el, event.target)
      ) {
        this.props.onClickAway(event)
      }
    }
  }

  render() {
    return this.props.children
  }
}

ClickAwayListener.propTypes = {
  children: PropTypes.node,
  onClickAway: PropTypes.any,
}

module.exports = ClickAwayListener
