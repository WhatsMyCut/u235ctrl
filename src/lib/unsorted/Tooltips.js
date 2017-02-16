const $ = require('jquery')
// tipsy attaches to the jquery prototype namespace as a side-effect
require('vendor/tipsy/tipsy')

module.exports = {
  init() {
    $('[data-tooltip]').tipsy({
      title() { return this.getAttribute('data-tooltip') }
    })

    $.fn.tipsy.elementOptions = (element, options) => {
      return Object.assign({}, options, {
        gravity: element.getAttribute('data-tooltip-dir') || 'n'
      })
    }
  },
  hideAll() {
    $('.tipsy').each(function() { $(this).remove() })
  }
}
