import React from "react";
import { NavLink } from "react-router-dom";
import s from "./header.module.scss";
import ReactIcon from "../../assets/images/svg/ReactIcon";

const Header = () => {
  return (
    <header className={s.header}>
      <NavLink className={s.logoLink} exact to="/">
        <ReactIcon classNameToProps={s.svg} />
      </NavLink>
      <nav>
        <NavLink className={s.menuLink} activeClassName={s.active} exact to="/">
          Home
        </NavLink>
        <NavLink className={s.menuLink} activeClassName={s.active} to="/about">
          About
        </NavLink>
        <NavLink className={s.menuLink} activeClassName={s.active} to="/product">
          Product
        </NavLink>
        <NavLink className={s.menuLink} activeClassName={s.active} to="/contact-us">
          Contact us
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
