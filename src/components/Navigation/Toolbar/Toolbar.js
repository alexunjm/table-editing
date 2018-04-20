import React from "react";

import classes from './Toolbar.css';
import NavItems from '../NavItems/NavItems'
import Logo from '../../Logo/Logo'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
