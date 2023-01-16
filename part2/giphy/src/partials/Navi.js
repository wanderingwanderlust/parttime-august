import {Navbar, NavbarBrand, Collapse, NavLink, NavItem, Nav} from 'reactstrap';
// We will use react-router-dom for navigating SPA(Single Page Application
import {Link, useNavigate} from 'react-router-dom'



function Navi() {

    const navigate = useNavigate();

    return(
        <Navbar color="light" light expand='md'>
            <NavbarBrand tag={Link} to='/'>Giphy App</NavbarBrand>
            <Collapse navbar>
                <Nav className='mr-auto' navbar>
                    <NavItem>
                        <NavLink tag={Link} to='/about'>About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/login'>Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/register'>Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/gifs/search'>Search Gifs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/gifs/saved'>Saved Gifs</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Navi;
