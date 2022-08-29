import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import Profile from './pages/Profile';
import ProductListing from './pages/ProductListing';

function AddContent() {
  let location = useLocation();
  return (
    <div className={location.pathname === "/" ? "home-page": ""}>
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

        <Route path="/cart" element={<Cart />} />
     
        <Route path="/login" element={<Login />} />
     
        <Route path="/profile" element={<Profile />} />
     
        <Route path="/shop" element={<ProductListing />} />
    
        <Route path="/register" element={<Register />} />
      </Routes>
      </div>
  )
}

function App() {

  

  return (
    <Router>
      <AddContent/>
    </Router>
  );
}

export default App;
