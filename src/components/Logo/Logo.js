import React from "react";

import classes from "./Logo.css";
import Logo from "../../assets/img/logo.svg";

const logo = props => (
  <div className={classes.Logo} >
    <img src={Logo} alt="Tabla Editable" />
  </div>
);

export default logo;
