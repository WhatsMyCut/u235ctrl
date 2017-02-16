const React = require('react')
const { Component, PropTypes } = React
const PageHeading = require('lib/components/PageHeading')
const { connect } = require('react-redux')
const withRouter = require('react-router/lib/withRouter')
const Link = require('react-router/lib/Link')
const Actions = require('lib/actions/Actions')
const ContentContainer = require('lib/components/ContentContainer')
const HasPerms = require('lib/components/HasPerms')
const Permissions = require('lib/constants/Permissions')
const GenericList = require('lib/components/GenericList')
const Pagination = require('lib/components/Pagination')
const SortableColumn = require('lib/components/SortableColumn')
const Button = require('lib/components/Button')
const qs = require('querystring')
const _ = require('lodash')

class UserList extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      query: {
        order: 'name',
        dir: 'ASC',
        page: 1
      }
    }

    this.onSort = this.onSort.bind(this)
    this.headerRenderer = this.headerRenderer.bind(this)
    this.verticalCellRenderer = this.verticalCellRenderer.bind(this)
  }

  componentDidMount() {
    let { dispatch } = this.props
    dispatch(Actions.fetchVerticals())
    this.fetchUsersDetailed(this.state.query)
  }

  componentWillReceiveProps(nextProps) {
    let nextQuery = nextProps.location.query
    if (nextQuery.page) {
      let eq = _.isEqual(nextQuery, this.state.query)
      if (!eq) {
        // fetch the fraud criterias list again if the query params have changed
        this.setState({ query: nextQuery }, () => {
          this.fetchUsersDetailed(this.state.query)
        })
      }
    }
  }

  fetchUsersDetailed(query) {
    let { dispatch } = this.props
    dispatch(Actions.fetchUsers(query))
      .then(users => {
        this.setState({ users })
      })
  }

  // handle user-side sorting
  onSort({ sortBy, sortDirection }) {
    if (sortBy != 'userId' && sortBy != 'active') {
      let { router } = this.props
      let query = qs.stringify({
        order: sortBy,
        dir: sortDirection,
        page: 1
      })

      // change the URL, URL changes will generate a render
      router.push(`/users?${query}`)
    }
  }

  verticalCellRenderer({ rowData }) {
    if (!this.props.verticals) { return 'Loading...' }
    let vertical = this.props.verticals[rowData.verticalId]
    if (!vertical) { return }
    return vertical.name
  }

  headerRenderer({ label, sortDirection }) {
    return <SortableColumn label={label} sortDirection={sortDirection} />
  }

  noSortHeaderRenderer( { label }) {
    return (
      <div>
        {label}
      </div>
    )
  }

  render() {
    let query = this.state.query
    let page = query.page
    let perPage = parseInt(query.perPage, 10) || 50
    let users = this.state.users
    let canShowPrevious = page && page > 1
    let canShowNext = users.length >= perPage

    let columns = [{
      label: 'User Name',
      dataKey: 'name',
      header: this.headerRenderer,
      cell({ rowData }) {
        return <Link to={`/users/${rowData.id}/view`}>{rowData.name}</Link>
      }
    }, {
      label: 'User ID',
      dataKey: 'id',
      header: this.headerRenderer,
      cell({ rowData }) {
        return <Link to={`/users/${rowData.id}/view`}>{rowData.id}</Link>
      }
    }, {
      label: 'Status',
      dataKey: 'active',
      header: this.noSortHeaderRenderer,
      cell({ rowData }) {
        return rowData ? 'Active' : 'Inactive'
      }
    }]

    return (
      <ContentContainer>
        <PageHeading
          title={'Users'}
          breadcrumbItems={[
            {
              text: 'Users'
            }
          ]}>
        <HasPerms needs={Permissions.USER_CREATE}>
          <Link to='/users/new'>
            <Button buttonType="primary">
              Create User
            </Button>
          </Link>
        </HasPerms>
        </PageHeading>
        <GenericList
          sortBy={query.order}
          sortDirection={query.dir}
          onChangeSort={this.onSort}
          rowData={users}
          columns={columns}
          tableClass='GenericList' />
        <Pagination
          route={'/users'}
          query={query}
          canShowPrevious={canShowPrevious}
          canShowNext={canShowNext} />
      </ContentContainer>
    )
  }
}

UserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  verticals: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return { verticals: state.verticals }
}

module.exports = connect(mapStateToProps)(withRouter(UserList))
