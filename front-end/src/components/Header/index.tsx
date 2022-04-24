import React from 'react';
import { Navbar, Container, Nav, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className=''>
            <Container fluid>
                <Navbar.Brand href="#">DO TASK</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px', borderLeft: "1px solid #D3D3D3"}} navbarScroll>
                        <Link className='nav-link' to="/">HOME</Link>
                        <Link className='nav-link' to="/tarefas">MINHAS TAREFAS</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;