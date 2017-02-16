let defaultWhitelist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

let generateRandomString = (len, whitelist = defaultWhitelist) => {
  if (len <= 0) { throw new Error('Must use a positive length') }
  let text = ''
  while ( len-- ) {
    text += whitelist.charAt(Math.floor(Math.random() * whitelist.length))
  }
  return text
}

module.exports = generateRandomString
