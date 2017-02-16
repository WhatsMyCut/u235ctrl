const React = require('react')
const { Component, PropTypes } = React
const { connect } = require('react-redux')
const cx = require('classnames')
const _ = require('lodash')
const Actions = require('lib/actions/Actions')

class NotificationList extends Component {
  constructor() {
    super()
    this.renderNotification = this.renderNotification.bind(this)
  }

  renderNotification(notification) {
    let dispatch = this.props.dispatch
    let className = cx({
      'NotificationList-alert': true,
      // bootstrap classes
      'alert': true,
      'alert-success': notification.type === 'success',
      'alert-info': notification.type === 'info',
      'alert-warning': notification.type === 'warning',
      'alert-danger': notification.type === 'danger',
      'alert-dismissable': notification.isDismissable === true
    })

    let onClickClose = (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(Actions.dismissNotification(notification.id))
    }

    return (
      <div key={notification.id} className={className}>
        {notification.isDismissable &&
          <button
            onClick={onClickClose}
            type="button"
            className="NotificationList-closeButton"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        }
        {notification.content}
      </div>
    )
  }

  render() {
    return (
      <div className="NotificationList">
        {_.map(this.props.notifications, this.renderNotification)}
      </div>
    )
  }
}

NotificationList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.object
}

const mapStateToProps = (state) => {
  return { notifications: state.notifications }
}

module.exports = connect(mapStateToProps)(NotificationList)
