const React = require('react')
const { Component, PropTypes } = React
const Link = require('react-router/lib/Link')
const { connect } = require('react-redux')
const ImageURLs = require('lib/constants/ImageURLs')
const withRouter = require('react-router/lib/withRouter')
const UsersSidebar = require('lib/components/UserSidebar')
const _ = require('lodash')
const cx = require('classnames')
const Actions = require('lib/actions/Actions')
const ClickAwayListener = require('lib/components/ClickAwayListener')
const Permissions = require('lib/constants/Permissions')
const hasPermissions = require('lib/unsorted/hasPermissions')

class Sidebar extends Component {
  constructor() {
    super()
    this.closeSidebar = this.closeSidebar.bind(this)
  }

  renderContextualSidebar() {
    let S = _.find({
      '/users': UsersSidebar
    }, (elem, href) => this.isValidContextualSidebarUrl(href))
    if (!S) { return null }
    return <S params={this.props.params} />
  }

  isValidContextualSidebarUrl(href) {
    let isActive = this.props.router.isActive
    //this is a hack to prevent the contextual sidebar from showup up when the
    //url exactly matches this route, since, for example, the /programs route
    //is not within the context of a specific program, so we don't want to display
    //contextual sidebar in that case
    let excludePrefixes = ['/users', '/users/new']
    return isActive(href) && !excludePrefixes.includes(this.props.location.pathname)
  }

  closeSidebar() {
    let dispatch = this.props.dispatch
    if (this.props.isExpanded) {
      dispatch(Actions.closeSidebar())
    }
  }

  render() {
    let { isExpanded } = this.props
    let usersLinkOptions = {
      target: '/users',
      imageSrc: ImageURLs.userSetupSidebarIcon,
      content: 'Users'
    }
    let usersReadPermissions = {
      needs: [Permissions.USERS_READ],
      permissions: this.props.permissions
    }
    let usersLink = hasPermissions(usersReadPermissions) ? usersLinkOptions : null

    let items = _.compact([
      {
        target: '/',
        imageSrc: ImageURLs.homeSidebarIcon,
        content: 'Home'
      },
      usersLink,
    ])

    let classes = 'Sidebar'
    if (isExpanded) { classes += ' is-expanded' }
    let isActive = this.props.router.isActive

    return (
      <div className="SidebarContainer">
        <ClickAwayListener onClickAway={this.closeSidebar}>
          <div className={classes}>
            <ul className='Sidebar-list'>
              {items.map((item, index) => {
                let className = cx('Sidebar-listItem clearfix', {
                  'Sidebar-listItemActive': isActive(item.target) && item.target !== '/',
                })
                return (
                  <li key={index} className={className}>
                    <Link to={item.target} className='Sidebar-listItemLink'>
                      <img src={item.imageSrc} alt="icon" className='Sidebar-listItemImage'/>
                      <span className='Sidebar-listItemContent'>{item.content}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </ClickAwayListener>
        {this.renderContextualSidebar()}
      </div>
    )
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  permissions: PropTypes.object
}

const mapStateToProps = (state) => {
  return { isExpanded: state.sidebar.isExpanded, permissions: state.currentUserPermissionsHash }
}
module.exports = connect(mapStateToProps)(withRouter(Sidebar))
