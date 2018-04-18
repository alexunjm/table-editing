import React from "react";

import Head from "./Head/Head";
import Body from './Body/Body';

import classes from './Table.css';

const table = props => (
  <table
    className={[
      classes.tableCentered,
      classes.tableNoSpacing,
      classes.tableStriped
    ].join(" ")}
  >
    <Head data={props.data[0]} />
    <Body
      keyDown={props.keyDown}
      clicked={props.clicked}
      changed={props.changed}
      data={props.data}
      focused={props.focused}
      blurred={props.blurred}
    />
  </table>
);

export default table;
