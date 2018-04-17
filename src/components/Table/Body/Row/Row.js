import React from "react";

import Editable from './Editable/Editable';

const row = props => {
	let keys = [];
	for (let key in props.data) {
		const data = { key, value: props.data[key] };
		if(props.data['editable']) {
			data.editable = true;
		}
		keys.push(data);
	}

	return <tr>
      {keys.map(elm => (
        <Editable
          clicked={props.clicked}
          changed={event => props.changed(event, {id: props.data.id, key: elm.key})}
          editable={elm.editable}
          key={elm.key}
          keyProp={elm.key}
          val={elm.value}
        />
      ))}
    </tr>;
};

export default row;