import React from "react";

import NavItems from "../NavItems/NavItems";
import Logo from "../../Logo/Logo"
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = props => (
  <Aux>
    <Backdrop show />
    <div className={classes.SideDrawer}>
      <div className={classes.Logo} ><Logo /></div>
      <nav>
        <NavItems />
      </nav>
    </div>
  </Aux>
);

export default sideDrawer;
