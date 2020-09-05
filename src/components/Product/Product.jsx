import React from "react";
import Name from "./Name/Name";
import Price from "./Price/Price";
import Description from "./Description/Description";
import s from "./product.module.css";

export default class Product extends React.Component {
  render() {
    return (
      <div className={s.productContainer}>
        <div className={s.box}>
          <Name name={this.props.name} />
          <Price price={this.props.price} />
          <Description description={this.props.description} />
        </div>
      </div>
    );
  }
}
