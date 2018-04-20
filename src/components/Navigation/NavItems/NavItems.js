import React from "react";
import NavItem from '../NavItem/NavItem'

import classes from './NavItems.css';

const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="#" active>Ejemplo 1</NavItem>
    <NavItem link="#">Ejemplo 2</NavItem>
    <NavItem link="#">Ejemplo 3</NavItem>
  </ul>
);

export default navItems;
