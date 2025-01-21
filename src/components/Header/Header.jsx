import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/headerAvatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleLogInClick,
  handleSignupClick,
  handleAddClick,
  weatherData,
}) {
  const contextUserData = useContext(CurrentUserContext);
  const currentUser = contextUserData !== null ? contextUserData : null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Header Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {currentUser && (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-containter">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={
                  currentUser.avatar != null
                    ? currentUser.avatar
                    : currentUser.name.charAt(0)
                }
                alt="Babitha Vaithy"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      )}

      {!currentUser && (
        <>
          <button
            onClick={handleSignupClick}
            type="button"
            className="header__signup"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogInClick}
            type="button"
            className="header__login"
          >
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
