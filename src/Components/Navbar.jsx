import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink,useNavigate } from 'react-router';
import { useAuth } from "../Context/AuthContext.jsx";


const NavBarBootstrap = () => {
    const { isAuthenticated, logOut } = useAuth();
    const navigate = useNavigate();
    function LogOut() {
        if (isAuthenticated != null) {
            if (isAuthenticated === true) {
                logOut();
            }
        }
    }
    function LogIn() {
        navigate('/login')
    }
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
                        {isAuthenticated ? (
                            null ):
                        <Nav.Link as={NavLink} to="/register">
                            Register
                            </Nav.Link>
                        }
                        {isAuthenticated && (
                            <Nav.Link as={NavLink} to="/dashboard">
                                Dashboard
                            </Nav.Link>
                        )}
                       
                    </Nav>
                    {
                        isAuthenticated ? (
                        <button className="btn btn-outline-danger my-2 my-sm-0" type="button" onClick={LogOut} >Log Out</button>
                        ) : (
                            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={LogIn} >Login</button>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarBootstrap;