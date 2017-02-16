const React = require('react')
const { Component, PropTypes } = React

class PageSectionHeading extends Component {
  render() {
    return (
      <div className="PageHeading">
        <div className="clearfix">
        <h5 className="PageSectionHeading-heading">{this.props.title}</h5>
        <div className="PageHeading-content">
          {this.props.children}
        </div>
      </div>
      <hr className="PageSectionHeading-rule"/>
      </div>
    )
  }
}

PageSectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

module.exports = PageSectionHeading
