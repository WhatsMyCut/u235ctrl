const React = require('react')
const { PropTypes } = React
// A simple component that use the grid item width classnames from bootstrap
function GridItem(props) {
  let width = props.width || 12
  if (typeof width !== 'number') { throw new Error('props.width is not a number') }
  if (width > 12 || width <= 0) { throw new Error('props.width is out of range 1-12') }
  return (
    <div className={'col-md-' + width} {...props}>
      {props.children}
    </div>
  )
}

GridItem.propTypes = {
  width: PropTypes.number,
  children: PropTypes.node.isRequired
}

module.exports = GridItem
