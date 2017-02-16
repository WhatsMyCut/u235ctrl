const React = require('react')
const { Component, PropTypes } = React
const Breadcrumbs = require('./Breadcrumbs')

class PageHeading extends Component {
  renderBreadcrumbs() {
    if (this.props.breadcrumbItems && this.props.breadcrumbItems.length > 0) {
      return (<Breadcrumbs items={this.props.breadcrumbItems} />)
    }
  }

  render() {
    return (
      <div className="PageHeading">
        <div className="clearfix">
          {this.renderBreadcrumbs()}
          <h3 className="PageHeading-heading">{this.props.title}</h3>
          <div className="PageHeading-content">
            {this.props.children}
          </div>
        </div>
        <hr className="PageHeading-rule"/>
      </div>
    )
  }
}

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  breadcrumbItems: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string,
      url: React.PropTypes.string
    })
  )
}

module.exports = PageHeading
