const React = require('react')
const { PropTypes } = React

const Loading = ({ size = 50 }) => (
  <div className='Loading' style={{ height: size, width: size }}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

Loading.propTypes = {
  size: PropTypes.number
}

module.exports = Loading
