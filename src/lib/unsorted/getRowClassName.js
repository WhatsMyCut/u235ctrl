module.exports = ({ index }) => {
  if (index < 0) {
    return 'VirtualizedTable-headerRow'
  } else {
    return index % 2 === 0 ? 'VirtualizedTable-evenRow' : 'VirtualizedTable-oddRow'
  }
}
