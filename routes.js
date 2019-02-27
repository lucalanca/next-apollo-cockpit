const routes = require('next-routes')

module.exports = routes()
  .add('home', 'index', '/home')
  .add('member', '/members/:slug')
  .add('rest')
  .add('rest-member', '/rest/member/:slug', 'rest/member');