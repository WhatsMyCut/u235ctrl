const getPoint = (node, event) => {
  let svg = node.ownerSVGElement || node

  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint()
    point.x = event.clientX, point.y = event.clientY
    point = point.matrixTransform(node.getScreenCTM().inverse())
    return [point.x, point.y]
  }

  let rect = node.getBoundingClientRect()
  let x = event.clientX - rect.left - node.clientLeft
  let y = event.clientY - rect.top - node.clientTop
  return [x, y]
}

module.exports = getPoint
