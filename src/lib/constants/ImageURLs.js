const hasOwnProperty = Object.prototype.hasOwnProperty

const prependBaseURL = (obj) => {
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      obj[key] = 'images/' + obj[key]
    }
  }
  return obj
}

const ImageURLs = prependBaseURL({
  userSetupSidebarIcon: '1@2x.png',
  importExportSetupSidebarIcon: '5@2x.png',
  homeSidebarIcon: 'home.png',
  catalogSidebarIcon: 'open-book.png',
  submissionManagementSidebarIcon: 'upload-to-the-cloud-dark-interface-symbol.png',
  headerLogo: 'header-logo.png'
})

module.exports = ImageURLs
