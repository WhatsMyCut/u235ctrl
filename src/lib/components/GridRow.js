const React = require('react')
const { PropTypes } = React

function GridRow(props) {
  return (
    <div className='row' {...props}>
      {props.children}
    </div>
  )
}

GridRow.propTypes = {
  children: PropTypes.node
}

module.exports = GridRow
