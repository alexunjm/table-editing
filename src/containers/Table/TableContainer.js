import React, {Component} from 'react';

import Table from '../../components/Table/Table';

class TableContainer extends Component {
  state = {
    data: [
      { id: 1, nombre: "alex", apellido: "jaramillo" },
      { id: 2, nombre: "andrea", apellido: "laguna" }
    ]
  };

  changeData = (data, value) => {
	const Data = this.state.data.map(elm => {
    for (let key in elm) {
      if (elm[key]["editable"]) {
        elm[key] = elm[key]["editable"];
      }
    }
    return elm;
  });
    const index = Data.findIndex(person => person.id === data.id);
    const person = Data[index];
    person[data.key] = { editable: value ? value : person[data.key] };
    this.setState({
      Data
    });
  };

  changeNameHandler = (event, data) => {
	this.changeData(data, event.target.value);
  };

  edit = (event, data) => {
	this.changeData(data, null);
  };

  render() {
    return (
      <div>
        <Table
          clicked={this.edit}
          changed={this.changeNameHandler}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default TableContainer;