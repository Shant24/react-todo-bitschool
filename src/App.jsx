import React from "react";
import Product from "./components/Product/Product";
// import Counter from "./components/Product/Counter/Counter";
// import Header from "./components/Header/Header";
// import Main from "./components/Main/Main";
// import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      {/* <Header />
      <Main />
      <Footer /> */}
      <Product
        name="iPhone 11(256gb)"
        price="920$"
        currency="487"
        description="A new dual‑camera system captures more of what you see and love. The fastest chip ever in a smartphone and all‑day battery life let you do more and charge less. And the highest‑quality video in a smartphone, so your memories look better than ever."
      />
      {/* <Counter /> */}
    </>
  );
};

export default App;
