import React from "react";
import s from "./description.module.scss";

export default class Description extends React.Component {
  render() {
    return <div className={s.descriptionContainer}>{this.props.description}</div>;
  }
}
