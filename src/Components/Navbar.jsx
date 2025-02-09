import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router';


const NavBarBootstrap = () => {
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold">
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link as={NavLink} to="/" end>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/FirstTask">
                            First Task
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/SecondTask">
                            Second Task
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/ThirdTask">
                            Third Task
                        </Nav.Link>
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarBootstrap;