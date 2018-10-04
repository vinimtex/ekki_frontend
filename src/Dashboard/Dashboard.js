import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faLocationArrow, faHandHoldingUsd, faHistory  } from '@fortawesome/free-solid-svg-icons'


class Dashboard extends React.Component {
    componentDidMount() {
        const {user} = this.props
        this.props.dispatch(userActions.getAccount(user.id));
        console.log(this.props)
    }

    render() {
        const { user, account } = this.props;
        return (
            <div className="">
                <div >
                    <h2 className="logo">ekki</h2>
                </div>
                <div className="wrapper">
                    <h4>Olá, {user.name}</h4>
                    <p><strong>Conta:</strong> { account.number }</p>
                    <p><strong>Saldo:</strong> R$ { account.balance }</p>
                    <p>
                        <Link className="btn btn-outline-danger" to="/login">Sair</Link>
                    </p>
                </div>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className="p-2 flex-fill">
                        <Link to="/transfer" className="btn btn-block btn-outline-light">
                            <FontAwesomeIcon icon={faLocationArrow} size="lg"/>
                            <br/>
                            Transferir
                        </Link>
                    </div>
                    <div className="p-2 flex-fill">
                        <Link to="/deposit" className="btn btn-block btn-outline-light">
                            <FontAwesomeIcon icon={faHandHoldingUsd} size="lg"/>
                            <br/>
                            Depositar
                        </Link>
                    </div>
                    <div className="p-2 flex-fill">
                        <Link to="/transactions/history" className="btn btn-block btn-outline-light">
                            <FontAwesomeIcon icon={faHistory} size="lg"/>
                            <br/>
                            Histórico de Transações
                        </Link>
                    </div>
                    <div className="p-2 flex-fill">
                        <Link to="/cards" className="btn btn-block btn-outline-light">
                            <FontAwesomeIcon icon={faCreditCard} size="lg"/>
                            <br/>
                            Cartões de Crédito
                        </Link>
                    </div>
                </div>
                
                
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