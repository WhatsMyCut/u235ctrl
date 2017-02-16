const React = require('react')
const { Component, PropTypes } = React
const Link = require('react-router/lib/Link')
const Pager = require('lib/unsorted/Pagination')

class Pagination extends Component {
  render() {
    return (
      <nav>
        <ul className="pager">
          {this.props.canShowPrevious &&
            <li className="prevPageLink">
              <Link to={`${this.props.route}?${Pager.getPrevPageQuery(this.props.query)}`}>Previous</Link>
            </li>
          }
          {this.props.canShowNext &&
            <li className="nextPageLink">
              <Link to={`${this.props.route}?${Pager.getNextPageQuery(this.props.query)}`}>Next</Link>
            </li>
          }
        </ul>
      </nav>
    )
  }
}

Pagination.propTypes = {
  route: PropTypes.string.isRequired,
  query: PropTypes.object,
  canShowPrevious: PropTypes.bool,
  canShowNext: PropTypes.bool
}

module.exports = Pagination
