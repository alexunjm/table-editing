import React, {Component} from 'react';

import Table from '../../components/Table/Table';

class TableContainer extends Component {

	state = {
		data : [
			{id: 1, nombre: "alex", apellido: "jaramillo"},
			{id: 2, nombre: "andrea", apellido: "laguna"}
		]
	}

	render() {
		return <div>
			<Table data={this.state.data} />
		</div>;
	}
}

export default TableContainer;