import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { userActions } from '../actions'

import { alertActions } from '../actions/alert.action';


class HistoryPage extends React.Component {
    
    constructor(props) {
        super(props)

        this.props.dispatch(userActions.getTransactionsHistory(this.props.user.id));
    }

    render() {
        const { transactions } = this.props;
        return (
            <div className="">
                <h2 className="logo">ekki</h2>
                <div className="wrapper-fill">
                    <h3 className="text-center">Histórico de Transações</h3>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">De</th>
                          <th scope="col">Para</th>
                          <th scope="col">Status</th>
                          <th scope="col">Valor (R$)</th>
                          <th scope="col">Data da Transação</th>
                        </tr>
                      </thead>
                      <tbody>
                      { transactions ? transactions.map((transaction) =>
                        <tr key={transaction.id}>
                            <td>{transaction.sender_holder_name}</td>
                            <td>{transaction.destination_holder_name}</td>
                            <td>{transaction.status === 'approved' ? 'Concluído' : 'Cancelada'}</td>
                            <td>{transaction.total_amount}</td>
                            <td>{transaction.created_at}</td>
                        </tr>
                     ) : <tr></tr>}
                      </tbody>
                    </table>
                </div>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className="p-2 flex-fill">
                        <Link className="btn btn-outline-light btn-block" to="/">Voltar</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { transactions } = state.transaction;
    const { user } = state.user;
    return {
        transactions,
        user
    };
}

const connectedHistory = connect(mapStateToProps)(HistoryPage);
export { connectedHistory as HistoryPage }; 