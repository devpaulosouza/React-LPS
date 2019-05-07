import React, { Component } from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Form, FormGroup, Label, Button, Input, Col, Row } from 'reactstrap';

import { ApplicationState } from '../../store';
import * as AuthActions from '../../store/ducks/auth/actions';
import { User, AuthState } from '../../store/ducks/auth/types';

interface StateProps {
  email: string;
  password: string;
}

interface DispatchProps {
  auth: AuthState;
  history: History;
  authRequest(user: User): void;
}

class Login extends Component<DispatchProps, StateProps> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  login() {
    const { authRequest } = this.props;
    const { auth } = this.props;

    authRequest(auth.user);
  }

  handleCancel() {
    const { history } = this.props;
    this.setState({ email: '', password: '' });
    history.push('/');
  }

  handleSubmit() {
    const { authRequest } = this.props;
    const { email, password } = this.state;

    authRequest({ email, password });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="container d-flex justify-content-center align-items-center">
        <Form className="mt-3 w-50">
          <FormGroup row>
            <Label sm={2} for="email">
              Email
            </Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="e-mail"
                value={email}
                onChange={({ target }) =>
                  this.setState(prevState => ({ ...prevState, email: target.value }))
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} for="password">
              Senha
            </Label>
            <Col sm={5}>
              <Input
                type="password"
                id="password"
                placeholder="senha"
                value={password}
                onChange={({ target }) =>
                  this.setState(prevState => ({ ...prevState, password: target.value }))
                }
              />
            </Col>
          </FormGroup>
          <Row>
            <Col>
              <p className="text-right">
                Não possui conta?
                <Link className="ml-2" to="/register">
                  Cadastrar
                </Link>
              </p>

              <Row className="d-flex flex-row-reverse">
                <Button className="ml-2" size="lg" color="success" onClick={this.handleSubmit}>
                  Entrar
                </Button>
                <Button outline color="danger" onClick={this.handleCancel}>
                  Cancelar
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

const mapDispathToProps = (dispath: Dispatch) => bindActionCreators(AuthActions, dispath);

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(withRouter(Login));
