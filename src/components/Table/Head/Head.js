import React from "react";

const head = props => {
	let keys = [];
	for (let key in props.data) {
		keys.push({id: key, name: key});
	}

	return <thead>
      <tr>
        {keys.map(col => <th key={col.id}>{col.name}</th>)}
      </tr>
    </thead>;
};

export default head;