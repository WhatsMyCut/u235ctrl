const React = require('react')
const { Component, PropTypes } = React
const _ = require('lodash')

class ContextualSidebarContainer extends Component {
  render() {
    return (
      <div className="ContextualSidebarContainer">
        {this.props.sidebarElem}
        <div className="ContextualSidebarContainer-content">
          {React.cloneElement(this.props.children, _.omit(this.props, 'sidebarElem', 'children'))}
        </div>
      </div>
    )
  }
}

ContextualSidebarContainer.propTypes = {
  sidebarElem: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
}


module.exports = ContextualSidebarContainer
