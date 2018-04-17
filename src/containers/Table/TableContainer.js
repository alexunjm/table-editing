import React, {Component} from 'react';

import Table from '../../components/Table/Table';

class TableContainer extends Component {
  state = {
    data: [
      { id: 1, nombre: "alex", apellido: "jaramillo" },
      { id: 2, nombre: "andrea", apellido: "laguna" }
    ]
  };

  getData() {
    return this.state.data.map(elm => {
      for (let key in elm) {
        if (elm[key]["editable"]) {
          elm[key] = elm[key]["editable"];
        }
      }
      return elm;
    });
  }

  setData(Data) {
    this.setState({ Data });
  }

  changeData = (data, value) => {
    const Data = this.getData();
    const index = Data.findIndex(person => person.id === data.id);
    const person = Data[index];
    person[data.key] = { editable: value ? value : person[data.key] };
    this.setData(Data);
  };

  changeNameHandler = (event, data) => {
    this.changeData(data, event.target.value);
  };

  edit = (event, data) => {
    this.changeData(data, null);
  };

  onKeyPressed = (event, data) => {
	const keys = [];
	for (let key in data.elm) {
		keys.push(key);
	}
	const index = keys.findIndex(key => key === data.elmData.key);
	const result = {
		prev: {key: keys[index-1], val: data.elm[keys[index-1]]},
		curr: {key: keys[index], val: data.elm[keys[index]]},
		next: {key: keys[index+1], val: data.elm[keys[index+1]]},
		elm: data.elm
	};
	console.log(result);
	const id = data.elm.id.editable ? data.elm.id.editable : data.elm.id;
    switch (event.which) {
		case 37: // left
		if(result.prev.key) this.changeData({id, key: result.prev.key}, null);
        break;

      case 38: // up
        break;

      case 39: // right
		if (result.next.key) this.changeData({ id, key: result.next.key }, null);
        break;

      case 40: // down
        break;

      default:
        return; // exit this handler for other keys
    }
  };

  render() {
    return (
      <div>
        <Table
          clicked={this.edit}
          changed={this.changeNameHandler}
          data={this.state.data}
          keyDown={this.onKeyPressed}
        />
      </div>
    );
  }
}

export default TableContainer;