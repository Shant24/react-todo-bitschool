import React from "react";
import s from "./main.module.scss";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Product from "./Product/Product";
import ContactUs from "./ContactUs/ContactUs";

const Main = () => {
  return (
    <main className={s.main}>
      <article>
        <Route exact path="/" render={() => <Home />} />

        <Route exact path="/about" render={() => <About />} />

        <Route exact path="/product" render={() => <Product />} />

        <Route exact path="/contact-us" render={() => <ContactUs />} />
      </article>
    </main>
  );
};

export default Main;
