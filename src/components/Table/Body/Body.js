import React from "react";

import Row from "./Row/Row";

const body = props => (
  <tbody>
    {props.data.map(elm => <Row key={elm.id} data={elm}/>)}
  </tbody>
);

export default body;