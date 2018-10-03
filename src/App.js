import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { LoginPage } from './LoginPage';
import { Dashboard } from './Dashboard';

import { PrivateRoute } from './components/PrivateRoute';
import { RegisterPage } from './RegisterPage/RegisterPage';
import { Cards } from './Cards/Cards';

class App extends Component {
  constructor(props) {
    super(props)

    const { dispatch } = this.props

  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/cards" component={Cards} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
      user
  };
}

const connectedApp = connect(mapStateToProps)(App)
export default App
