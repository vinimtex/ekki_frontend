import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { userActions } from '../actions'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            document_number: '',
            birth: '',
            email: '',
            password: '',
            email: '',
            submitted: false,
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({ submitted: true })
        const { name, document_number, birth, email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password && name && document_number && birth) {
            dispatch(userActions.register(name, document_number, birth, email, password));
            this.setState({ redirect: true })
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { name, document_number, birth, email, password, submitted, redirect } = this.state;
        if(redirect) {
            return <Redirect to="/login" />
        }
        return (
            <div>
            <h2 className="logo">ekki</h2>
                <div className="wrapper">
                    <h3 className="text-center">Abra sua conta</h3>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                            <label htmlFor="name">Nome Completo</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                            {submitted && !name &&
                                <div className="help-block">Preencha seu nome completo</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !document_number ? ' has-error' : '')}>
                            <label htmlFor="document_numer">CPF</label>
                            <input type="text" className="form-control" name="document_number" value={document_number} onChange={this.handleChange} />
                            {submitted && !document_number &&
                                <div className="help-block">Preencha seu CPF</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !birth ? ' has-error' : '')}>
                            <label htmlFor="birth">Data de Nascimento</label>
                            <input type="date" className="form-control" name="birth" value={birth} onChange={this.handleChange} />
                            {submitted && !birth &&
                                <div className="help-block">Preencha sua data de nascimento</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="help-block">Preencha seu e-mail</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Senha</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Preencha sua Senha</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-success float-right">Criar Conta Bancária</button>
                            <Link className="btn btn-outline-secondary " to="/login">Voltar</Link>
                            {loggingIn &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        
    };
}

const connectedLoginPage = connect(mapStateToProps)(RegisterPage);
export { connectedLoginPage as RegisterPage }; 