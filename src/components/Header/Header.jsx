import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import ReactIcon from "../../assets/images/svg/ReactIcon";

const Container = styled.header`
  width: 80%;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
`;

const Link = styled(NavLink)`
  padding: 0 20px;
  text-decoration: none;
  color: white;

  &:hover {
    color: #4b00ff;
  }
`;

const LinkNav = styled(NavLink)`
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  border-left: 1px solid white;

  &:first-child {
    border: none;
  }

  &.active {
    color: #4b00ff;
  }

  &:hover {
    color: #4b00ff;
  }
`;

const Header = () => {
  return (
    <Container>
      <Link exact to="/">
        <ReactIcon />
      </Link>
      <nav>
        <LinkNav exact to="/">
          Home
        </LinkNav>
        <LinkNav to="/about">About</LinkNav>
        <LinkNav to="/product">Product</LinkNav>
        <LinkNav to="/contact-us">Contact us</LinkNav>
      </nav>
    </Container>
  );
};

export default Header;
