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
        focused={props.focused}
        blurred={props.blurred}
        keyDown={(e, data) => props.keyDown(e, data, { index, array })}
      />
    ))}
  </tbody>
);

export default body;