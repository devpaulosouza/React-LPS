import React, { Component } from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { ApplicationState } from '../../store';
import { AuthState } from '../../store/ducks/auth/types';

import * as AuthActions from '../../store/ducks/auth/actions';

interface Location {
  pathname: string;
  search: string;
  hash: string;
}

interface StateProps {
  isOpen: boolean;
}

interface DispatchProps extends RouteComponentProps {
  auth: AuthState;
  logoutRequest(): void;
}

interface OwnProps {
  location: Location;
}

type Props = DispatchProps & OwnProps;

class NavBar extends Component<Props, StateProps> {
  static renderNavButton(path: string, text: string, active: boolean) {
    return (
      <NavItem>
        <NavLink active={active} tag={Link} to={path}>
          {text}
        </NavLink>
      </NavItem>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleLogout() {
    const { logoutRequest } = this.props;
    logoutRequest();
  }

  renderDropdown() {
    const { auth, location } = this.props;

    if (auth.logged) {
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Nome
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <NavLink className="text-dark" tag={Link} to="/profile">
                Perfil
              </NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink className="text-dark" onClick={this.handleLogout}>
                Sair
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }

    return (
      <NavLink active={location.pathname.startsWith('/login')} tag={Link} to="/login">
        Login
      </NavLink>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { location } = this.props;

    return (
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">
            Apadrinhe
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              {NavBar.renderNavButton('/', 'Início', location.pathname === '/')}
              {NavBar.renderNavButton(
                '/about-us',
                'Sobre nós',
                location.pathname.startsWith('/about-us'),
              )}
              {NavBar.renderNavButton(
                '/contact',
                'Contato',
                location.pathname.startsWith('/contact'),
              )}
            </Nav>
            <Nav navbar className="ml-auto">
              {this.renderDropdown()}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
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
)(withRouter(NavBar));
