import React from 'react';

const row = props => {
	let keys = [];
	for (let key in props.data) {
		keys.push({ key, value: props.data[key] });
	}
	return (
  <tr>
    {keys.map(elm => <td key={elm.key} >{elm.value}</td>)}
  </tr>
	)
};

export default row;