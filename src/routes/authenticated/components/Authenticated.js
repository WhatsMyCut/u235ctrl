const React = require('react')
const { Component, PropTypes } = React
const Sidebar = require('lib/components/Sidebar')

// The Authenticated route renders the sidebar along with
// the current routed component
class Authenticated extends Component {
  render() {
    return (
      <div className="Authenticated">
        <Sidebar params={this.props.params} location={this.props.location} rerender={{}}/>
        <div className="Authenticated-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Authenticated.propTypes = {
  children: PropTypes.node,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

module.exports = Authenticated
