import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { userActions } from '../actions'
import $ from 'jquery'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCcMastercard, faCcVisa  } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard, faTrash, faEdit  } from '@fortawesome/free-solid-svg-icons'

class Deposit extends React.Component {
    constructor(props) {
        super(props)

        const { user, account } = this.props
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
            account_number: '',
            total_amount: 0,
            balance_amount: 0,
            card_id: '',
            payment_method: 'credit_card',
            submitted: false,
            password: ''
        }
        this.props.dispatch(userActions.getCards(user.id));
        this.props.dispatch(userActions.getContacts(user.id));
        this.props.dispatch(userActions.getAccount(user.id));
        
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCc = this.handleChangeCc.bind(this)
        this.openCardModal = this.openCardModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.handleCreateCard = this.handleCreateCard.bind(this)
        this.handleDepositSubmit = this.handleDepositSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.cards !== this.props.cards) {
          if(nextProps.cards.length > 0) {
            this.setState({ card_id: nextProps.cards[0].id });
          }
        }
      
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
      console.log(value)
      this.setState({ [name]: value })
    }

    handleChangeCc(e) {
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

    handleDepositSubmit(e) {
      e.preventDefault()
  
      this.setState({ submitted: true})
      const { account_number, total_amount, card_id, payment_method } = this.state;
      const { dispatch, user, account } = this.props;
      if (true) { //validar campos
          let data = {
              account_number: account.number,
              amount:parseFloat(total_amount),
              payment_method,
              card_id
          }

          dispatch(userActions.deposit(user.id, data))
          this.setState({ showCardModal: false, submitted: false })
          
      }
    }

    setAccountNumber(e, number) {
      this.setState({ account_number: number })
    }

    renderModal() {
        const { showCardModal, cardInput, submitted } = this.state;
        return(
            <div className="modal fade" id="cardModal" tabIndex="-1" role="dialog" aria-labelledby="cardModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cardModalLabel">Cadastrar Cartão de Crédito</h5>
                            <button type="button" className="close" onClick={this.closeModal} data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form name="form" onSubmit={this.handleCreateCard}>
                                <div className={'form-group' + (submitted && !cardInput.card_number ? ' has-error' : '')}>
                                    <label htmlFor="card_number">Número do Cartão de Crédito</label>
                                    <input type="text" className="form-control" name="card_number" value={cardInput.card_number} onChange={this.handleChangeCc} />
                                    {submitted && !cardInput.card_number &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !cardInput.expiration_month ? ' has-error' : '')}>
                                    <label htmlFor="expiration_month">Mês de Expiração</label>
                                    <input type="text" className="form-control" name="expiration_month" value={cardInput.expiration_month} onChange={this.handleChangeCc} />
                                    {submitted && !cardInput.expiration_month &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !cardInput.expiration_year ? ' has-error' : '')}>
                                    <label htmlFor="expiration_year">Ano de Expiração</label>
                                    <input type="text" className="form-control" name="expiration_year" value={cardInput.expiration_year} onChange={this.handleChangeCc} />
                                    {submitted && !cardInput.expiration_year &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>

                                <div className={'form-group' + (submitted && !cardInput.ccv ? ' has-error' : '')}>
                                    <label htmlFor="ccv">Código de Segurança (CCV)</label>
                                    <input type="text" className="form-control" name="ccv" value={cardInput.ccv} onChange={this.handleChangeCc} />
                                    {submitted && !cardInput.ccv &&
                                        <div className="help-block">Preencha número do seu cartão de crédito</div>
                                    }
                                </div>

                                <div className={'form-group' + (submitted && !cardInput.card_holder ? ' has-error' : '')}>
                                    <label htmlFor="card_holder">Nome do Titular</label>
                                    <input type="text" className="form-control" name="card_holder" value={cardInput.card_holder} onChange={this.handleChangeCc} />
                                    {submitted && !cardInput.card_holder &&
                                        <div className="help-block">Nome do titual do cartão de crédito</div>
                                    }
                                </div>

                                <div className={'form-group' + (submitted && !cardInput.issuer ? ' has-error' : '')}>
                                    <label htmlFor="issuer">Bandeira</label>
                                    <input type="text" className="form-control" name="issuer" value={cardInput.issuer} onChange={this.handleChangeCc} />
                                    {submitted && !cardInput.issuer &&
                                        <div className="help-block">Erro ao detectar a bandeira do seu cartão de crédito</div>
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Cadastrar</button>
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

    render() {
        const { showCardModal, card_id, total_amount, submitted } = this.state
        const { account, cards } = this.props
        return (
          <div className="">
                { showCardModal ? this.renderModal() : '' }
                <h2 className="logo">ekki</h2>
                <div className="wrapper-fill">
                    <h3 className="text-center">Depositar com Cartão de Crédito</h3>
                    <small>Seu saldo é de: R$ {account.balance}</small>
                    <form name="form" id="transferForm" onSubmit={this.handleDepositSubmit}>
                        <div className={'form-group' + (submitted && !total_amount ? ' has-error' : '')}>
                            <label htmlFor="name">Quantia (R$)</label>
                            <input required type="text" className="form-control" name="total_amount" value={total_amount} onChange={this.handleChange} />
                            {submitted && !total_amount &&
                                <div className="help-block">Preencha o valor a ser transferido</div>
                            }
                        </div>
                        {
                            cards.length > 0 ?
                              <div className={'form-group' + (submitted && !card_id ? ' has-error' : '')}>
                                  <label htmlFor="save_contact">Selecione um Cartão de Crédito</label>
                                  <select required className="form-control" name="card_id" defaultValue={card_id} onChange={this.handleChange}> 
                                    {
                                      cards.map((card, index) => <option key={card.id} value={card.id}>{card.issuer} - Terminado em {card.last_four_digits}</option>)
                                    }
                                  </select>
                                  <button className="btn btn-secondary" onClick={ (e) => this.openCardModal(e, false) }>Pagar com Outro Cartão de Crédito</button>
                              </div>
                            :
                              <button className="btn btn-primary" onClick={ (e) => this.openCardModal(e, false) }>Cadastrar um Cartão de Crédito</button>
                        }
                        <br/>
                        <div className="form-group">
                          <button type="submit" className="btn btn-block btn-success">Depositar</button>
                        </div>
                        
                    </form>
                </div>
                <div className="d-flex flex-row justify-content-center flex-wrap">
                    <div className="p-2 ">
                        <Link className="btn btn-outline-light btn-block" to="/">Cancelar</Link>
                    </div>
                    
                    
                </div>
                
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { cards, user, account } = state.user;
    return {
        cards,
        user,
        account
    };
}

const connectedTransaction = connect(mapStateToProps)(Deposit);
export { connectedTransaction as Deposit }; 