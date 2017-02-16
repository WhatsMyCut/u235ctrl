const React = require('react')
const { Component, PropTypes } = React
const Table = require('lib/components/Table')

class GenericList extends Component {
  constructor() {
    super()
    this.onSort = this.onSort.bind(this)
  }

  onSort({ sortBy, sortDirection }) {
    if (this.props.onChangeSort) {
      this.props.onChangeSort({ sortBy, sortDirection })
    }
  }

  noRowsRenderer() {
    if (this.props.noRowsRenderer) {
      return this.props.noRowsRenderer()
    } else {
      return (
        <div className="GenericList-noContent">
          No results were found
        </div>
      )
    }
  }

  render() {
    let rowData = this.props.rowData

    return (
      <div>
        {(rowData == null || rowData.length == 0) && this.noRowsRenderer() }
        {Array.isArray(rowData) && rowData.length > 0 &&
        <div className={this.props.tableClass}>
          <Table
            onRowClick={this.props.onRowClick}
            rowClassNameGetter={this.props.rowClassNameGetter}
            onSort={this.onSort}
            sortBy={this.props.sortBy}
            sortDirection={this.props.sortDirection}
            rows={rowData}
            columns={this.props.columns} />
        </div>
        }
      </div>
    )
  }
}

GenericList.propTypes = {
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onChangeSort: PropTypes.func,
  onRowClick: PropTypes.func,
  noRowsRenderer: PropTypes.func,
  rowClassNameGetter: PropTypes.func,
  rowData: PropTypes.array,
  tableClass: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    header: PropTypes.func.isRequired,
    cell: PropTypes.func.isRequired
  })).isRequired
}

module.exports = GenericList
