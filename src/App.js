import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsCart2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Profile from './pages/Profile';
import ProductListing from './pages/ProductListing';
import UserProvider from './context/UserContext';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';

function AddContent() {
  let location = useLocation();
  return (
    <div className={location.pathname === "/" ? "home-page" : ""}>
      <UserProvider>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/"><img src={require('../src/img/warlet.png')} style={{ height: '30px' }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="d-flex w-100 justify-content-between">
                <Link className="text-decoration-none nav-text" to="/wallets">Shop</Link>
                <Link to="/login" className="ms-lg-auto text-decoration-none pe-3 nav-text" ><big><CgProfile /></big></Link>
                <Link className="text-decoration-none nav-text" to="/cart"><big><BsCart2 /></big></Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallets/:product_id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallets" element={<ProductListing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>
      </UserProvider>

    </div>
  )
}

function App() {



  return (
    <Router>
      <AddContent />
    </Router>
  );
}

export default App;
