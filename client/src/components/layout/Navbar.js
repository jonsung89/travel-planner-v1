import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentTrip } from '../../actions/tripActions';


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentTrip();
    this.props.logoutUser();
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLink = (
      <NavItem>
        <NavLink href="#" onClick={this.onLogoutClick.bind(this)}>Log Out</NavLink>
      </NavItem>
    );

    return (
        <Navbar className="navbar navbar-dark bg-dark" color="faded" light>
          <Link to="/" className="navbar-brand mr-auto">Travel Planner</Link>
          <NavbarToggler onClick={this.toggleNavbar} className="" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {/* <NavItem>
                <NavLink href="/about" target="_blank">About</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink href="https://github.com/jonsung89/travel-planner-v1/tree/master" target="_blank">GitHub Repo</NavLink>
              </NavItem>
              {isAuthenticated ? authLink : null}
            </Nav>
          </Collapse>
        </Navbar>
    )
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentTrip })(NavBar);