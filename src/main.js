require('es6-promise/auto')
require('lib/polyfills/ObjectAssign')
require('lib/unsorted/bootstrap')
require('moment-timezone/builds/moment-timezone-with-data')
const React = require('react')
require('react-tap-event-plugin')()
const { render } = require('react-dom')
const useRouterHistory = require('react-router/lib/useRouterHistory')
const useBeforeUnload = require('history/lib/useBeforeUnload')
const Router = require('react-router/lib/Router')
const { createHashHistory } = require('history')
const { Provider } = require('react-redux')
const createApplicationStore = require('lib/store/createApplicationStore')
const Actions = require('lib/actions/Actions')
const createUser = require('lib/api/createUser')
const createRestAdapter = require('lib/api/createRestAdapter')
const Tooltips = require('lib/unsorted/Tooltips')

// initialize tooltip event listeners
Tooltips.init()

// useRouterHistory creates a composable higher-order function
const appHistory = useBeforeUnload(useRouterHistory(createHashHistory))({ queryKey: false })

// create the routing hierarchy to pass to react-router
// each of the child routes will require the component dynamically
// with require.ensure and the supporting code for routes will be
// loaded when necessary from webpack
const store = createApplicationStore()

const getRoutes = (store) => {
  return {
    childRoutes: [{
      path: '/',
      component: require('lib/components/App'),
      childRoutes: [
        require('routes/styleguide')(store),
        require('routes/authenticated')(store),
        require('routes/login')(store)
      ]
    }]
  }
}

const renderRoutes = () => {
  return render(
    <Provider store={store}>
      <Router history={appHistory} routes={getRoutes(store)} />
    </Provider>,
    document.getElementById('app')
  )
}

const fetchConfiguration = () => {
  return Promise.resolve(require('config/config.json'))
}

// start rendering views
// the Provider component from react-redux allows components
// that have been decorated by the connect() function from react-redux
// access to the ApplicationStore for dispatching actions and receiving props
const startApplication = () => {
  // fetch configuration to determine the correct API configuration
  fetchConfiguration().then(config => {
    // create an adapter for making API calls
    const adapter = createRestAdapter({ host: config.host })
    const user = createUser(adapter)
    // set the user for Actions to use
    Actions.setUser(user)
    // attempt to get the current user, if we cannot get the current user
    // it means we are not authenticated and login is required
    store.dispatch(Actions.fetchInitialAppData())
      .then(renderRoutes)
      .catch(() => {
        renderRoutes()
      })
  })
}

startApplication()
