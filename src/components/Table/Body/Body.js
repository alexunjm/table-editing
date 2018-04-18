import React from "react";

import Row from "./Row/Row";

const body = props => (
  <tbody>
    {props.data.map((elm, index, array) => (
      <Row
        clicked={(event, key) => props.clicked(event, { key, id: elm.id })}
        changed={props.changed}
        key={elm.id}
        data={elm}
        keyDown={(e, data) => props.keyDown(e, data, { index, array })}
        blurred={props.blurred}
      />
    ))}
  </tbody>
);

export default body;