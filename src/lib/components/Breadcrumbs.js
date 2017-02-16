const React = require('react')
const { Component, PropTypes } = React

class Breadcrumbs extends Component {
  render() {
    return (
      <ol className="breadcrumb">
        {this.props.items.map((item, index) => {
          if (index === this.props.items.length - 1) {
            return (<li key={index} className="active"><strong>{item.text}</strong></li>)
          } else {
            return (<li key={index}><a href={item.url}>{item.text}</a></li>)
          }
        })}
      </ol>
    )
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired
}

module.exports = Breadcrumbs
