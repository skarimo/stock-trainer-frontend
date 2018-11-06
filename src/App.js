import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login.js'
import { connect } from 'react-redux'
import { login } from './actions/authorizeActions'
// import 'semantic-ui'

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
