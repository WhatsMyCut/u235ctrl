const React = require('react')
const Link = require('react-router/lib/Link')
const { Component, PropTypes } = React

class ContextualSidebar extends Component {
  render() {
    return (
      <div className="ContextualSidebar">
        <p className="ContextualSidebar-pageName">{this.props.name}</p>
        <ul className="ContextualSidebar-listContainer">
          {this.props.links.map((link, idx) => (
            <li key={idx} className="ContextualSidebar-listItem">
              <Link
                to={link.href}
                className="ContextualSidebar-link"
                onlyActiveOnIndex
                activeClassName="ContextualSidebar-linkActive">
                {link.content}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

ContextualSidebar.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
}

module.exports = ContextualSidebar
