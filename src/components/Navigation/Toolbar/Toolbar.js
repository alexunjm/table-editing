import React from "react";

import classes from './Toolbar.css';
import Logo from '../../../assets/img/logo.png';
import NavItems from '../NavItems/NavItems'

const toolbar = props => (
  <header className={classes.Toolbar} >
    <div>MENU</div>
    <div><img src={Logo} alt="Tabla Editable"/></div>
    <nav>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
