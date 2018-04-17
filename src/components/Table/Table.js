import React from "react";

import Head from "./Head/Head";
import Body from './Body/Body';

const table = props => (
  <table>
    <Head data={props.data[0]} />
    <Body data={props.data} />
  </table>
);

export default table;