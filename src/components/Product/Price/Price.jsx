import React from "react";
import s from "./price.module.css";

export default class Price extends React.Component {
  state = {
    price: this.props.price,
  };

  handleChangeClick = () => {
    let { price } = this.state;

    const amountOfPrice = price
      .split("")
      .splice(0, price.length - 1)
      .join("");

    price[price.length - 1] === "$"
      ? (price = `${amountOfPrice * this.props.currency}֏`)
      : (price = `${amountOfPrice / this.props.currency}$`);

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
