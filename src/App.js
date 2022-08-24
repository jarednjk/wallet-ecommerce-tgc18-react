import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';


function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="d-flex w-100 justify-content-between">
                  <Nav.Link href="/shop">Shop</Nav.Link>
                  <Nav.Link className="ms-auto" href="/login"><big><CgProfile /></big></Nav.Link>
                  <Nav.Link href="/cart"><big><BsCart2 /></big></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;
