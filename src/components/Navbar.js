import React from 'react'

import {
  Button,
  Collapse,
  Navbar as NB,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

import {Link} from 'react-router-dom'

class Navbar extends React.Component{
    constructor (props) {
        super (props)
        this.state = {
            navCollapsible: false
        }
    }
    toggler = ()=>{
        this.setState({navCollapsible:!this.state.navCollapsible})
    }
    
    render(){
        const {navCollapsible} = this.state
        return(
          <div>
          <NB color="light" light expand="md" className="shadow fixed-top">
            <NavbarBrand href="/" className="text-success"><strong><i>Arkafoodel</i></strong></NavbarBrand>
            <NavbarToggler onClick={this.toggler} />
            <Collapse isOpen={navCollapsible} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link className="nav-link text-success" to="#">Menu</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="#">Cart</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Restaurant
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <Link className="nav-link" to="/modals">Modals</Link>
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Button color="success">
              <Link to="/login" className="text-white">Log In </Link>
              </Button>&nbsp; &nbsp;
              <Button outline color="success">
                <Link to="/register" className="text-success">Register</Link>
              </Button>
            </Collapse>
          </NB>
        </div>
        )
    }

}

export default Navbar
