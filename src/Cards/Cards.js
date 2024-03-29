import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { userActions } from '../actions'
import $ from 'jquery'
import './Cards.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCcMastercard, faCcVisa  } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard, faTrash, faEdit  } from '@fortawesome/free-solid-svg-icons'

class Cards extends React.Component {
    constructor(props) {
        super(props)

        const { cards, user } = this.props
        this.state = {
            showCardModal: false,
            cardInput: {
                id: '',
                card_number: '',
                ccv: '',
                issuer: '',
                expiration_month: '',
                expiration_year: '',
                card_holder: ''
            },
            editingCard: false,
            submitted: false
        }
        this.props.dispatch(userActions.getCards(user.id));
        
        this.handleChange = this.handleChange.bind(this)
        this.openCardModal = this.openCardModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.handleCreateCard = this.handleCreateCard.bind(this)
        this.handleEditCard = this.handleEditCard.bind(this)
        this.handleDeleteCard = this.handleDeleteCard.bind(this)
    }

    openCardModal(e, isEditing, input = {}) {
        e.preventDefault()
        this.setState({
            showCardModal: true,
            editingCard: isEditing,
            cardInput: {
                id: input.id,
                card_number: '',
                ccv: '',
                issuer: input.issuer,
                expiration_month: input.expiration_month,
                expiration_year: input.expiration_year,
                card_holder: input.card_holder
            }
        })
        $(function(){
            $('#cardModal').modal('toggle')
        })
    }

    closeModal(e) {
        e.preventDefault()

        this.setState({cardInput: {
            id: '',
            card_number: '',
            ccv: '',
            issuer: '',
            expiration_month: '',
            expiration_year: '',
            card_holder: ''
        }})
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({...this.state, cardInput: {...this.state.cardInput, [name]:value}})
    }

    handleCreateCard(e) {
        e.preventDefault()
        $('#cardModal').modal('toggle')
        
        this.setState({ submitted: true})
        const { cardInput } = this.state;
        const { dispatch, user } = this.props;
        if (true) { //validar campos
            dispatch(userActions.createCard(user.id, cardInput))
            this.setState({ showCardModal: false, submitted: false })
            
        }
    }

    handleDeleteCard(e, cardId) {
        e.preventDefault()
        const { dispatch, user } = this.props;
        dispatch(userActions.deleteCard(user.id, cardId))            
        
    }

    handleEditCard(e, cardId) {
        e.preventDefault()
        $('#cardModal').modal('toggle')
        
        this.setState({ submitted: true})
        const { cardInput } = this.state;
        const { dispatch, user } = this.props;
        if (true) { //validar campos
            dispatch(userActions.updateCard(user.id, cardId, cardInput))
            
            this.setState({ showCardModal: false, submitted: false })
            
        }
    }

    renderModal() {
        const { showCardModal, cardInput, editingCard, submitted } = this.state;
        return(
            <div className="modal fade" id="cardModal" tabIndex="-1" role="dialog" aria-labelledby="cardModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cardModalLabel">{ editingCard ? 'Editando Cartão de Crédito' : 'Cadastrar Cartão de Crédito' }</h5>
                            <button type="button" className="close" onClick={this.closeModal} data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <small>{editingCard ? `Por segurança, para editar seu cartão de crédito, 
                                            é necessário preencher novamente o número do 
                                            cartão de crédito e o código de segurança (CCV)` : ''}</small>
                            <form name="form" onSubmit={ editingCard ? (e) => this.handleEditCard(e, cardInput.id) : this.handleCreateCard}>
                                <div className={'form-group' + (submitted && !cardInput.card_number ? ' has-error' : '')}>
                                    <label htmlFor="card_number">Número do Cartão de Crédito</label>
                                    <input type="text" className="form-control" name="card_number" value={cardInput.card_number} onChange={this.handleChange} />
                                    {submitted && !cardInput.card_number &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !cardInput.expiration_month ? ' has-error' : '')}>
                                    <label htmlFor="expiration_month">Mês de Expiração</label>
                                    <input type="text" className="form-control" name="expiration_month" value={cardInput.expiration_month} onChange={this.handleChange} />
                                    {submitted && !cardInput.expiration_month &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !cardInput.expiration_year ? ' has-error' : '')}>
                                    <label htmlFor="expiration_year">Ano de Expiração</label>
                                    <input type="text" className="form-control" name="expiration_year" value={cardInput.expiration_year} onChange={this.handleChange} />
                                    {submitted && !cardInput.expiration_year &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>

                                <div className={'form-group' + (submitted && !cardInput.ccv ? ' has-error' : '')}>
                                    <label htmlFor="ccv">Código de Segurança (CCV)</label>
                                    <input type="text" className="form-control" name="ccv" value={cardInput.ccv} onChange={this.handleChange} />
                                    {submitted && !cardInput.ccv &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>

                                <div className={'form-group' + (submitted && !cardInput.card_holder ? ' has-error' : '')}>
                                    <label htmlFor="card_holder">Nome do Titular</label>
                                    <input type="text" className="form-control" name="card_holder" value={cardInput.card_holder} onChange={this.handleChange} />
                                    {submitted && !cardInput.card_holder &&
                                        <div className="help-block">Nome do titual do cartão de crédito</div>
                                    }
                                </div>

                                <div className={'form-group' + (submitted && !cardInput.issuer ? ' has-error' : '')}>
                                    <label htmlFor="issuer">Bandeira</label>
                                    <input type="text" className="form-control" name="issuer" value={cardInput.issuer} onChange={this.handleChange} />
                                    {submitted && !cardInput.issuer &&
                                        <div className="help-block">Erro ao detectar a bandeira do seu cartão de crédito</div>
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">{ editingCard ? 'Editar' : 'Cadastrar' }</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.closeModal} className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderCardIssuerIcon(issuer) {
        switch(issuer) {
            case 'mastercard':
                return <FontAwesomeIcon icon={faCcMastercard} size="5x"/>
            case 'visa':
                return <FontAwesomeIcon icon={faCcVisa} size="5x"/>
            default:
                return <FontAwesomeIcon icon={faCreditCard} size="5x"/> 
        }
    }

    render() {
        const { cards, user } = this.props;
        const { showCardModal, cardInput, editingCard } = this.state;

        return (
          <div className="">
                { showCardModal ? this.renderModal() : '' }
                <h2 class="logo">ekki</h2>
                <div className="wrapper-fill">
                    <h3 className="text-center">Meus Cartões de Créditos</h3>
                    <div className="d-flex flex-row justify-content-center flex-wrap">
                    {cards ? cards.map((card, index) =>
                        <div className="p-2 flex-fill">
                            <div className="card" key={card.id}>
                                <div className="card-body">
                                    <h5 className="card-title">Terminado em {card.last_four_digits}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {this.renderCardIssuerIcon(card.issuer)}
                                    </h6>
                                    <div className="card-text">
                                        <ul className="list-group">
                                            <li className="list-group-item">Expira em: {card.expiration_month}/{card.expiration_year}</li>
                                            <li className="list-group-item">{card.card_holder}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-footer"> 
                                    <a href="" className="card-link" onClick={ (e) => this.openCardModal(e, true, card) }>
                                        <FontAwesomeIcon icon={faEdit} size="lg"/>
                                        Editar
                                    </a>
                                    <a href="" className="card-link float-right" onClick={ (e) => this.handleDeleteCard(e, card.id) }>
                                        <FontAwesomeIcon icon={faTrash} size="lg"/>
                                        Remover
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : ''}
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className="p-2 flex-fill">
                        <button className="btn btn-outline-light btn-block" onClick={ (e) => this.openCardModal(e, false) }>Cadastrar Cartão de Crédito</button>
                    </div>
                    <div className="p-2 flex-fill">
                        <Link className="btn btn-outline-light btn-block" to="/">Voltar</Link>
                    </div>
                </div>
                
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { cards, user } = state.user;
    return {
        cards,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(Cards);
export { connectedLoginPage as Cards }; 