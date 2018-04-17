import React from "react";

import Row from "./Row/Row";

const body = props => (
  <tbody>
    {props.data.map(elm => (
      <Row
        clicked={(event, key) => props.clicked(event, {key, id: elm.id})}
        changed={props.changed}
        key={elm.id}
        data={elm}
      />
    ))}
  </tbody>
);

export default body;