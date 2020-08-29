import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Product from "./Product/Product";
import ContactUs from "./ContactUs/ContactUs";

const MainContainer = styled.main`
  width: 80%;
  height: calc(100vh - 80px - 100px);
  margin: 0 auto;
  padding: 40px 20px;
  font-size: 30px;
`;

const Main = () => {
  return (
    <MainContainer>
      <article>
        <Route exact path="/" render={() => <Home />} />

        <Route exact path="/about" render={() => <About />} />

        <Route exact path="/product" render={() => <Product />} />

        <Route exact path="/contact-us" render={() => <ContactUs />} />
      </article>
    </MainContainer>
  );
};

export default Main;
