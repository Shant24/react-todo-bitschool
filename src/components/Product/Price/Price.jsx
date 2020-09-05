import React from "react";
import s from "./price.module.css";

export default class Price extends React.Component {
  state = {
    price: this.props.price,
  };

  handleChangeClick = () => {
    let { price } = this.state;

    price[price.length - 1] === "$"
      ? (price = `${
          price
            .split("")
            .splice(0, price.length - 1)
            .join("") * 487
        }֏`)
      : (price = `${
          price
            .split("")
            .splice(0, price.length - 1)
            .join("") / 487
        }$`);

    this.setState({ price });
  };

  render() {
    return (
      <div className={s.priceContainer}>
        <div className={s.price}>{this.state.price}</div>
        <button onClick={this.handleChangeClick}>Change the currency</button>
      </div>
    );
  }
}
