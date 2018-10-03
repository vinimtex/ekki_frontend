import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions'

class Dashboard extends React.Component {
    componentDidMount() {
        const {user} = this.props
        this.props.dispatch(userActions.getAccount(user.id));
        console.log(this.props)
    }

    render() {
        const { user, account } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi { user.name }!</h1>
                <p>Conta: { account.number }</p>
                <p>Saldo: { account.balance }</p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, account } = state.user;
    return {
        user,
        account
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };