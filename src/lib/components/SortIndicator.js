import React, { PropTypes } from 'react'
import cn from 'classnames'
import SortDirection from './SortDirection'

/**
 * Displayed beside a header to indicate that a FlexTable is currently sorted by this column.
 */
function SortIndicator({ sortDirection = SortDirection.DESC }) {
  const classNames = cn('SortIndicator', {
    'glyphicon glyphicon-chevron-up': sortDirection === SortDirection.ASC,
    'glyphicon glyphicon-chevron-down': sortDirection === SortDirection.DESC,
    'glyphicon glyphicon-minus': sortDirection === SortDirection.INVISIBLE
  })

  return <span>&nbsp;<span name="chevron-up" className={classNames}></span></span>
}

SortIndicator.propTypes = {
  sortDirection: PropTypes.oneOf([SortDirection.ASC, SortDirection.DESC, SortDirection.INVISIBLE])
}

module.exports = SortIndicator
