const React = require('react')
const { Component, PropTypes } = React
const SortDirection = require('lib/components/SortDirection')
import cn from 'classnames'
const noop = () => {}

const setSortDirection = ({dataKey, sortDirection, sortBy}) => {
  let isColumnNotSortedColumn = dataKey !== sortBy
  if (isColumnNotSortedColumn) {
    return SortDirection.INVISIBLE
  }

  return sortDirection
}

class Table extends Component {
  render() {
    let sortDirection = this.props.sortDirection
    let sortBy = this.props.sortBy
    let onSort = this.props.onSort || function() {}

    let headers = this.props.columns.map((column, idx) => {
      let dataKey = column.dataKey

      let headerRendererArgs = {
        dataKey: dataKey,
        label: column.label,
        sortDirection: sortDirection,
        sortBy: sortBy,
      }

      // update the sort direction so that the sort icons
      // will only display for explicitly sorted columns.
      headerRendererArgs.sortDirection = setSortDirection(headerRendererArgs)

      let onClick = () => {}
      let isSortable = column.sortable || column.sortable === undefined
      if (isSortable) {
        const newSortDirection =
          sortBy !== dataKey || sortDirection === SortDirection.DESC
          ? SortDirection.ASC
          : SortDirection.DESC

        onClick = () => {
          onSort({ sortBy: dataKey, sortDirection: newSortDirection })
        }
      }

      let style = {}
      if (column.width) {
        style.width = column.width
      }
      const tableHeaderClassNames = cn('test-nowrap', 'Table-columnHeader')

      return (
        <th className={tableHeaderClassNames} key={'cell_' + idx} onClick={onClick} style={style}>
          {column.header(headerRendererArgs)}
        </th>
      )
    })

    let rows = this.props.rows.map((rowData, rowIndex) => {
      let renderData = { rowData, rowIndex }
      let cells = this.props.columns.map((column, idx) => {
        return (
          <td key={'cell_' + idx}>
            {column.cell(renderData)}
          </td>
        )
      })
      let onRowClick = this.props.onRowClick || noop
      let onClick = () => { onRowClick(rowData) }
      let rowClassNameGetter = this.props.rowClassNameGetter || noop
      return (
        <tr key={'row_' + rowIndex} onClick={onClick} className={rowClassNameGetter(renderData)}>
          {cells}
        </tr>
      )
    })

    return (
      <table className="table table-striped">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

Table.propTypes = {
  onSort: PropTypes.func,
  onRowClick: PropTypes.func,
  rowClassNameGetter: PropTypes.func,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    header: PropTypes.func.isRequired,
    cell: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired
}

module.exports = Table
