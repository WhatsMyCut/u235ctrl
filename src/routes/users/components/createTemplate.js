const React = require('react')
const PageHeading = require('lib/components/PageHeading')
const GridRow = require('lib/components/GridRow')
const GridItem = require('lib/components/GridItem')

let mapLayoutToGrid = (layout, inputs) => {
  return layout.map((rowItems, index) => {
    return (
      <GridRow key={index}>
      {
        rowItems.map((rowItem, index) => {
          return (
            <GridItem key={index} width={rowItem.width}>
              {inputs[rowItem.key]}
            </GridItem>
          )
        })
      }
      </GridRow>
    )
  })
}

let createTemplate = (title, layout) => {
  // eslint-disable-next-line react/display-name
  return locals => {
    return (
      <div>
        <PageHeading title={title} />
        {mapLayoutToGrid(layout, locals.inputs)}
      </div>
    )
  }
}

module.exports = createTemplate
