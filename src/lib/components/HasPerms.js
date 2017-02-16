const React = require('react')
const { Component, PropTypes } = React
const { connect } = require('react-redux')
const hasPermissions = require('lib/unsorted/hasPermissions')

class HasPerms extends Component {

  render() {
    if (!hasPermissions(this.props)) {
      if (this.props.alternativeOutput) {
        <span>{this.props.alternativeOutput}</span>
      }
      return (
        null
      )
    }
    return this.props.children
  }
}

HasPerms.propTypes = {

  needs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,
  permissions: PropTypes.object,
  children: PropTypes.node,
  alternativeOutput: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  testNoPermissions: PropTypes.bool
}

const mapStateToProps = (state) => {
  return { permissions: state.currentUserPermissionsHash }
}

module.exports = connect(mapStateToProps)(HasPerms)
