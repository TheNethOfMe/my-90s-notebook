import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Menu from "../common/Menu";

const Navbar = props => {
  const authContext = useContext(AuthContext);
  const { profile, isAuthenticated, logout, loadUser } = authContext;

  const [menu, changeMenu] = useState({
    showMenu: false,
    theme: "paper-cup"
  });

  const { showMenu, theme } = menu;

  useEffect(() => {
    if (!profile) {
      loadUser();
    } else {
      console.log(profile.theme);
      changeMenu({ ...menu, theme: profile.theme });
    }
    // eslint-disable-next-line
  }, [profile]);

  const logoutClick = e => {
    e.preventDefault();
    logout();
  };

  const toggleMenu = () => {
    changeMenu({ ...menu, showMenu: !showMenu });
  };

  const returnIcon = icon => {
    return `/images/themes/${theme}/${icon}-icon.png`;
  };

  const authLinks = (
    <ul className="header__nav-list">
      <li>
        <div className="header__nav-item" onClick={toggleMenu}>
          <img
            className="header__nav-icon"
            src={returnIcon("menu")}
            alt="menu-icon"
          />
          <p>Menu</p>
        </div>
      </li>
      <li>
        <Link className="header__nav-item" to="/settings">
          <img
            className="header__nav-icon"
            src={returnIcon("settings")}
            alt="settings-icon"
          />
          <p>Settings</p>
        </Link>
      </li>
      <li>
        <div className="header__nav-item" onClick={logoutClick}>
          <img
            className="header__nav-icon"
            src={returnIcon("logout")}
            alt="logout-icon"
          />
          <p>Logout</p>
        </div>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="header__nav-list">
      <li>
        <Link className="header__nav-item" to="/login">
          <p>Login</p>
        </Link>
      </li>
      <li>
        <Link className="header__nav-item" to="/register">
          <p>Register</p>
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="header__nav">
        <div className="header__nav-section">
          <ul>
            <li id="header__brand">
              <img
                src="/images/icons/logo-transparent.png"
                alt="my 90s notebook logo"
              />
            </li>
            <li>
              <Link className="header__nav-item" to="/">
                <p>My 90s Notebook</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="header__nav-section">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
      {showMenu && (
        <Menu hide={showMenu} themebg={`menu-background-${theme}`} />
      )}
    </div>
  );
};

export default Navbar;
