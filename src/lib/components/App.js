const React = require('react')
const Component = React.Component
const Header = require('lib/components/Header')
const NotificationList = require('lib/components/NotificationList')

class App extends Component {
  render() {
    return (
      <div className="App">
        <NotificationList />
        <Header/>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

module.exports = App
