const React = require('react')
const { Component, PropTypes } = React
const { connect } = require('react-redux')
const Actions = require('lib/actions/Actions')
const withRouter = require('react-router/lib/withRouter')
const ImageURLs = require('lib/constants/ImageURLs')

class Header extends Component {
  constructor() {
    super()
    this.onClickSidebarExpand = this.onClickSidebarExpand.bind(this)
    this.onClickLogout = this.onClickLogout.bind(this)
    this.onClickLamdas = this.onClickLamdas.bind(this)
  }

  onClickSidebarExpand(e) {
    e.preventDefault()
    let { dispatch } = this.props
    dispatch(Actions.invertSidebarExpansion())
  }

  onClickLogout() {
    let { dispatch, router } = this.props
    dispatch(Actions.logout())
    router.push('/login')
  }

  onClickLamdas() {
    let { router } = this.props
    router.push('/processing-steps')
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            {this.props.isLoggedIn &&
              <a
                href="#"
                className="navbar-brand Header-sidebarExpand"
                onClick={this.onClickSidebarExpand}
                onMouseUp={e => e.preventDefault()}>
                <span className="glyphicon glyphicon-menu-hamburger"></span>
              </a>
            }
            <img className="navbar-brand Header-logo" src={ImageURLs.headerLogo} />
          </div>

          {this.props.isLoggedIn &&
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle navbar-brand"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <span className="glyphicon glyphicon-user"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={this.onClickLamdas}>Processing Steps</a></li>
                  <li><a onClick={this.onClickLogout}>Log out</a></li>
                </ul>
              </li>
            </ul>
          }
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => { return state.auth }

module.exports = connect(mapStateToProps)(withRouter(Header))
