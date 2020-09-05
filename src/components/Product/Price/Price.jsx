import React from "react";
import s from "./price.module.scss";

export default class Price extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: props.price,
      rate: props.rate,
    };
  }

  handleChangeClick = () => {
    let { price, rate } = this.state;

    console.log(price);
    console.log(rate);

    price[price.length - 1] === "$"
      ? (price = `${parseFloat(price) * rate}֏`)
      : (price = `${parseFloat(price) / rate}$`);

    this.setState({ price });
  };

  render() {
    return (
      <div className={s.priceContainer}>
        <div className={s.price}>{this.state.price}</div>
        <button className={s.button} onClick={this.handleChangeClick}>
          Change the currency
        </button>
      </div>
    );
  }
}
