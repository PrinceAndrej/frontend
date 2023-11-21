import React from "react";
import logo from "./images/New_era_F1_logo.png";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="F1 logo" />
      <nav className="navBar">
        <p>Home</p>
        <p>Drivers</p>
        <p>Races</p>
        <p>Teams</p>
        <p>Quiz</p>
      </nav>
    </header>
  );
};

export default Header;
