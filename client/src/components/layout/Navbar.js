import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

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
  
  render() {
    return (
        <Navbar className="navbar navbar-dark bg-dark" color="faded" light>
          <Link to="/" className="navbar-brand mr-auto">Travel Planner</Link>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/jonsung89/travel-planner-v1/tree/master">GitHub Repo</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    )
  }
}

export default NavBar