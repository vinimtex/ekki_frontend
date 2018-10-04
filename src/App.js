import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { LoginPage } from './LoginPage';
import { Dashboard } from './Dashboard';

import { PrivateRoute } from './components/PrivateRoute';
import { RegisterPage } from './RegisterPage/RegisterPage';
import { Cards } from './Cards/Cards';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { alertActions } from './actions/alert.action';
import { Transaction } from './Transaction/Trasaction';
import { Deposit } from './Deposit/Deposit';
import { HistoryPage } from './Transaction/HistoryPage';

const MySwal = withReactContent(Swal)

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { alert } = this.props
    if(alert.type) {
      MySwal.fire(alert)
    }
    return (
      <div className="App">
        <Router>
          <div className="container">
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/cards" component={Cards} />
            <PrivateRoute path="/transfer" component={Transaction} />
            <PrivateRoute path="/deposit" component={Deposit} />
            <PrivateRoute path="/transactions/history" component={HistoryPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as App }; 
