import React from "react";
import Name from "./Name/Name";
import Price from "./Price/Price";
import Description from "./Description/Description";
import s from "./product.module.scss";

export default class Product extends React.Component {
  render() {
    const { name, price, rate, description } = this.props;

    return (
      <div className={s.productContainer}>
        <div className={s.box}>
          <Name name={name} />
          <Price price={price} rate={rate} />
          <Description description={description} />
        </div>
      </div>
    );
  }
}
