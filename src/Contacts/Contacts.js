import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { userActions } from '../actions'

import { alertActions } from '../actions/alert.action';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash  } from '@fortawesome/free-solid-svg-icons'

class Contacts extends React.Component {
    
    constructor(props) {
        super(props)

        this.props.dispatch(userActions.getContacts(this.props.user.id));

        this.handleRemoveContact = this.handleRemoveContact.bind(this)
    }

    handleRemoveContact(e, contactId) {

        e.preventDefault()

        this.setState({ submitted: true })
        const { dispatch, user} = this.props;
        dispatch(userActions.removeContact(user.id, contactId));
    }

    render() {
        const { contacts } = this.props;
        return (
            <div className="">
                <h2 className="logo">ekki</h2>
                <div className="wrapper-fill">
                    <h3 className="text-center">Meus Contatos</h3>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Nome</th>
                          <th scope="col">Conta</th>
                          <th scope="col">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                      { contacts ? contacts.map((contact) =>
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.accounts[0].number}</td>
                            <td>
                                <button onClick={(e) => this.handleRemoveContact(e, contact.id)} className="btn btn-xs btn-outline-danger">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
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
    const { user, contacts } = state.user;
    return {
        contacts,
        user
    };
}

const connectedContacts = connect(mapStateToProps)(Contacts);
export { connectedContacts as Contacts }; 