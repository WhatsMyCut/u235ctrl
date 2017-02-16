const React = require('react')
const { PropTypes } = React

const SaveAndCancelLinks = (props) => (
  <div className='SaveAndCancelLinks-container'>
    <span
      className='SaveAndCancelLinks-action SaveAndCancelLinks-save'
      onClick={props.onClickSave}>{'Save'}
    </span>
    <span
      className='SaveAndCancelLinks-action SaveAndCancelLinks-cancel'
      onClick={props.onClickCancel}>{'Cancel'}
    </span>
  </div>
)

SaveAndCancelLinks.propTypes = {
  onClickSave: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
}

module.exports = SaveAndCancelLinks
