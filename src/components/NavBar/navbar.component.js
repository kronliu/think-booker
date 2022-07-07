import React, { useState, useContext, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";
import UserContext from "../../userContext";

import Login from "../Login/login.component";
import Register from "../Register/register.component";
import GradientStrip from "../GradientStrip/gradient-strip.component";
import OutsideAlerter from "../OutsideAlerter/outside-alerter.component";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (showLogin || showRegister) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  });

  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar shadow">
        <Link className="navbar-brand" to="/">
          <span className="text-teal">think</span>Booker
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user.id ? (
              <>
                <Link to="/courses">
                  <div className="nav-item">Courses</div>
                </Link>
                {!user.isAdmin ? (
                  <Link to="/profile">
                    <div className="nav-item">Profile</div>
                  </Link>
                ) : null}
                <Link to="/logout">
                  <div className="nav-item">Logout</div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/courses">
                  <div className="nav-item">Courses</div>
                </Link>
                <div>
                  <div
                    className="nav-item"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </div>
                </div>
                <div>
                  <div
                    className="nav-item login-button mx-3"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </div>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <GradientStrip />

      <div className={showLogin ? "modal modal-show " : "modal"}>
        <div className="modal-content col-sm-10 col-md-8 col-lg-5">
          <OutsideAlerter handleClose={() => setShowLogin(false)}>
            <Login handleClose={() => setShowLogin(false)} />
          </OutsideAlerter>
        </div>
      </div>

      <div className={showRegister ? "modal modal-show " : "modal"}>
        <div className="modal-content col-sm-10 col-md-8 col-lg-5">
          <OutsideAlerter handleClose={() => setShowRegister(false)}>
            <Register />
          </OutsideAlerter>
        </div>
      </div>
    </>
  );
};

export default NavBar;
