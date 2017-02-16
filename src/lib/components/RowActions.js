const React = require('react')
const { Component, PropTypes } = React
const Icon = require('./Icon')

class RowActions extends Component {

  render() {
    return <div className="btn-group">
      <div className="btn btn-link dropdown-toggle" data-toggle="dropdown" id={this.props.label}><Icon name="option-horizontal" /></div>
      <ul className="dropdown-menu dropdown-menu-right" aria-labelledby={this.props.label}>
        { this.props.actions.map((action, index) => {
          return <li key={index}><a onClick={action.onClick} href={action.url || '#'}>{action.text}</a></li>
        })}
      </ul>
    </div>
  }
}

RowActions.propTypes = {
  label: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
  })).isRequired
}

module.exports = RowActions
