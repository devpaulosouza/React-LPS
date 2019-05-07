import React, { Component } from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentsProps, Link } from 'react-router-dom';
import { History } from 'history';
import { Form, FormGroup, Label, Button, Input, Col, Row } from 'reactstrap';

import { ApplicationState } from '../../store';
import * as AuthActions from '../../store/ducks/auth/actions';
import { User, AuthState } from '../../store/ducks/auth/types';

interface StateProps extends RouteComponentsProps {
  email: string;
  password: string;
  confirmPassword: string;
}

interface DispatchProps {
  auth: AuthState;
  history: History;
  registerRequest(user: User): void;
}

class Login extends Component<DispatchProps, StateProps> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  login() {
    const { registerRequest } = this.props;
    const { auth } = this.props;

    registerRequest(auth.user);
  }

  handleSubmit() {
    const { registerRequest } = this.props;
    const { email, password } = this.state;

    registerRequest({ email, password });
  }

  handleCancel() {
    const { history } = this.props;
    this.setState({ email: '', password: '', confirmPassword: '' });
    history.push('/');
  }

  render() {
    const { email, password, confirmPassword } = this.state;

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
          <FormGroup row>
            <Label sm={2} for="confirm-password">
              Confirmar
            </Label>
            <Col sm={5}>
              <Input
                type="password"
                id="confirm-password"
                placeholder="confirme a senha"
                value={confirmPassword}
                onChange={({ target }) =>
                  this.setState(prevState => ({ ...prevState, confirmPassword: target.value }))
                }
              />
            </Col>
          </FormGroup>

          <Row>
            <Col>
              <p className="text-right">
                Já possui conta?
                <Link className="ml-2" to="/login">
                  Entrar
                </Link>
              </p>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className="d-flex flex-row-reverse">
              <Button size="lg" color="success" onClick={this.handleSubmit}>
                Cadastrar
              </Button>
              <Button className="mr-2" outline color="danger" onClick={this.handleCancel}>
                Cancelar
              </Button>
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
