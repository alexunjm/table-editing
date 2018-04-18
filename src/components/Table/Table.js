import React from "react";

import Head from "./Head/Head";
import Body from './Body/Body';

const table = props => (
  <table>
    <Head data={props.data[0]} />
    <Body
      keyDown={props.keyDown}
      clicked={props.clicked}
      changed={props.changed}
      data={props.data}
      blurred={props.blurred}
    />
  </table>
);

export default table;