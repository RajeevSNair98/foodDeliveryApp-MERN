import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {  toast } from 'react-hot-toast';
import {MdDeliveryDining} from 'react-icons/md'
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import {Avatar, Badge} from 'antd'
import './Header.css'

const Header = () => {
  const {auth,setAuth} = useAuth()
  const [cart] = useCart()

  const handleLogout = () =>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem("auth")
    toast.success('Logout successfully')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-5 container">
      <Container>
        <Link to={'/'}  className="head1"><Navbar.Brand>
           <MdDeliveryDining/> TastyEats
            </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mx-auto navbar-nav bg-dark">

          <Nav.Link className="mx-3 nav-links head1" >
            <Link to={'/'} className="head1 color-white">Menu</Link>
          </Nav.Link>
           
           <Nav.Link className="mx-3 nav-links">
            <Link to={'/about'} className="head1 ">About</Link>
            </Nav.Link>

           
            {/* <Nav.Link className="mx-3 nav-links">
              Contact
            </Nav.Link> */}

            {/* 
            <Nav.Link className="mx-3 nav-links">
            <Link to={'/'} className="head1 ">Services</Link>
            </Nav.Link> */}

            
            {/* <Nav.Link className="mx-3 nav-links">
              Restaurants
            </Nav.Link> */}
           \
          </Nav>
          <Nav className="">
            <Nav.Link  className="mx-3 logsign d-flex">
              <Badge count={cart?.length} showZero>
              <Link to={'/cart'} className="head1 mx-3 btn btn-info">Cart</Link>

              </Badge>

            {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header