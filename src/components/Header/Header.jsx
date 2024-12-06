import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/headerAvatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
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
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-containter">
          <p className="header__username">Babitha Vaithy</p>
          <img src={avatar} alt="Babitha Vaithy" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
