import React, { PropTypes } from 'react'
import SortIndicator from './SortIndicator'
import SortDirection from './SortDirection'
/**
 * Displayed beside a header to indicate that a FlexTable is currently sorted by this column.
 */
function SortableColumn({ sortDirection = SortDirection.DESC, label = '' }) {
  return (<div className='Table-columnHeaderSortable'>
      <span>{label}</span>
      <SortIndicator sortDirection={sortDirection} />
    </div>)
}

SortableColumn.propTypes = {
  label: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf([SortDirection.ASC, SortDirection.DESC, SortDirection.INVISIBLE])
}

module.exports = SortableColumn
