import React, { Component } from "react";

import Table from "../../components/Table/Table";

class TableContainer extends Component {
  state = {
    /**
     * Datos iniciales
     */
    data: [
      { id: 1, nombre: "alex", apellido: "jaramillo" },
      { id: 2, nombre: "andrea", apellido: "laguna" },
      { id: 3, nombre: "valentina", apellido: "" },
      { id: 6, nombre: "cristian", apellido: "buenaño" },
      { id: 7, nombre: "luisa", apellido: "lopez" }
    ],
    arrowInsideInputs: true
  };

  /**
   * Devuelve los datos sin marca de edición
   */
  getData() {
    return this.state.data.map(elm => {
      for (let key in elm) {
        if (elm[key].hasOwnProperty("editable")) {
          elm[key] = elm[key]["editable"];
        }
      }
      return elm;
    });
  }

  /**
   * Actualizamos los datos del container
   */
  setData(Data) {
    this.setState({ Data });
  }

  /**
   * Obtener los datos y un elemento de los datos por el id
   */
  getDataNElmById = id => {
    const Data = this.getData();
    const index = Data.findIndex(elm => elm.id === id);
    const elm = Data[index];
    return { Data, elm };
  };

  /**
   * cambiar el valor de una key a editable
   */
  changeData = (data, value) => {
    const res = this.getDataNElmById(data.id);
    res.elm[data.key] = {
      editable: value || value === "" ? value : res.elm[data.key]
    };
    this.setData(res.Data);
  };

  /**
   * manejador de evento de cambio en input
   * cambia un dato editable por le valor del input
   */
  changeInputValueHandler = (event, data) => {
    this.changeData(data, event.target.value);
  };

  focusHandler = event => {
    event.target.select();
  };

  /**
   * al perder el foco, actualiza la data para quitar la opción de editable
   */
  blurHandler = event => {
    return this.setData(this.getData());
  };

  /**
   * Cambia un td al dar click por un input con el contenido editable
   */
  tdToInputEditableHandler = (event, data) => {
    this.changeData(data, null);
  };

  /**
   * Dado un array y un index, obtiene el elemento y devuelve el valor de una key dada
   * ---Return---
   * Devuelve null si el índice no existe
   */
  getValFromArray = (array, index, key) =>
    array[index] ? array[index][key] : null;

  navigation(event, data, upNDownArgs) {
    event.preventDefault();
    /**
     * saca las propiedades de el objeto data.elm
     */
    const keys = [];
    for (let key in data.elm) {
      keys.push(key);
    }
    /**
     * saca el índice de las propiedades que tengan la key data.elmData.key
     * (la key del input que se está editando)
     */
    const index = keys.findIndex(key => key === data.elmData.key);
    /**
     * Obtiene el key y el value de cada elemento junto al input que se está editando
     */
    const result = {
      prev: {
        key: keys[index - 1] === "id" ? null : keys[index - 1],
        val: data.elm[keys[index - 1]]
      },
      curr: { key: keys[index], val: data.elm[keys[index]] },
      next: {
        key: keys[index + 1] === "id" ? null : keys[index + 1],
        val: data.elm[keys[index + 1]]
      },
      up: {
        key: keys[index],
        val: this.getValFromArray(
          upNDownArgs.array,
          upNDownArgs.index - 1,
          keys[index]
        )
      },
      down: {
        key: keys[index],
        val: this.getValFromArray(
          upNDownArgs.array,
          upNDownArgs.index + 1,
          keys[index]
        )
      }
    };
    const id = data.elm.id.editable ? data.elm.id.editable : data.elm.id;
    switch (event.which) {
      case 37: // left
        if (result.prev.key)
          this.changeData({ id, key: result.prev.key }, null);
        break;

      case 38: // up
        if (result.up.val || result.up.val === "")
          this.changeData(
            {
              id: this.getValFromArray(
                upNDownArgs.array,
                upNDownArgs.index - 1,
                "id"
              ),
              key: result.up.key
            },
            null
          );
        break;

      case 39: // right
        if (result.next.key)
          this.changeData({ id, key: result.next.key }, null);
        break;

      case 40: // down
        if (result.down.val || result.down.val === "")
          this.changeData(
            {
              id: this.getValFromArray(
                upNDownArgs.array,
                upNDownArgs.index + 1,
                "id"
              ),
              key: result.down.key
            },
            null
          );
        break;

      default:
        return; // exit this handler for other keys
    }
  }

  /**
   * Función que maneja el evento de flechas presionadas en el teclado
   */
  onKeyDown = (event, data, upNDownArgs) => {
    //valida si es un evento de flecha
    if (event.which >= 37 && event.which <= 40) {
      if (this.state.arrowInsideInputs) {
        if (event.which === 37) {
          const position = event.target.selectionStart;
          if (position > 0) {/* console.log("no navega", { position }); */}
          else this.navigation(event, data, upNDownArgs);
        } else if (event.which === 39) {
          const val = event.target.value;
          const position = event.target.selectionStart;
          if (position < val.length) {/* console.log("no navega", { position, len: val.length }); */}
          else this.navigation(event, data, upNDownArgs);
        } else this.navigation(event, data, upNDownArgs);
      } else {
        this.navigation(event, data, upNDownArgs);
      }
    }
  };

  /**
   * Habilita o deshabilita las flechas dentro de input
   */
  arrowsNavHandler = (event) => {
    this.setState({ arrowInsideInputs: !this.state.arrowInsideInputs });
  };

  render() {
	  let button = '';
	  if (this.state.data.length) {
		button = <button onClick={this.arrowsNavHandler}>
			{this.state.arrowInsideInputs ? "Habilitar" : "Deshabilitar"}{" "}
			navegación con flechas rápida
		</button>;
		}
    return (
      <div>
        <Table
          clicked={this.tdToInputEditableHandler}
          changed={this.changeInputValueHandler}
          data={this.state.data}
          keyDown={this.onKeyDown}
          focused={this.focusHandler}
          blurred={this.blurHandler}
        />
        {button}
      </div>
    );
  }
}

export default TableContainer;
