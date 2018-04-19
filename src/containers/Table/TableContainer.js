import React, { Component } from "react";

import Table from "../../components/Table/Table";
import _ from "../../customjs/custom";

import classes from "../../components/Table/Table.css";

class TableContainer extends Component {
  state = {
    /**
     * Datos iniciales
     */
    data: [
      { id: 1, nombre: "alex", apellido: "jaramillo" },
      { id: 2, nombre: "andrea", apellido: "laguna" },
      { id: 3, nombre: "marlon", apellido: "gomez" },
      { id: 6, nombre: "cristian", apellido: "buenaño" },
      { id: 7, nombre: "luisa", apellido: "lopez" }
    ],
    arrowInsideInputs: true
  };

  /**
   * Devuelve los datos sin marca de edición
   */
  getData() {
    return _(this.state.data).mapByProperty(
      this,
      (key, val, item) =>
        val.hasOwnProperty("editable") ? val["editable"] : val
    );
  }

  /**
   * Actualizamos los datos del container
   */
  setData(data) {
    this.setState({ data });
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

  /**
   * Encuentra la primera columna editable de la fila actual
   */
  findFirstColEditable = (keys, index) => {
    while (--index >= 0) {
      return keys[index] === "id" ? keys[index + 1] : this.findFirstColEditable(keys, index);
    }
  };

  navigation(event, data, upNDownArgs) {
    event.preventDefault();
    /**
     * saca las propiedades de el objeto data.elm
     */
    const keys = Object.entries(data.elm).map(pair => pair[0]);
    /**
     * saca el índice de las propiedades que tengan la key data.elmData.key
     * (la key del input que se está editando)
     */
    const index = keys.findIndex(key => key === data.elmData.key);
    let id = data.elm.id.editable ? data.elm.id.editable : data.elm.id;
    /**
     * Obtiene el key y el value de cada elemento junto al input que se está editando
     */
    let key = null;
    let val = null;
    switch (event.which) {
      case 37: // left
        key = keys[index - 1] === "id" ? null : keys[index - 1];
        if (key) this.changeData({ id, key }, null);
        break;

      case 9: // tab
      case 39: // right
        key = keys[index + 1] === "id" ? null : keys[index + 1];
        if (key) this.changeData({ id, key }, null);
        else {
          val = this.getValFromArray(
            upNDownArgs.array,
            upNDownArgs.index + 1,
            keys[index]
          );
          id = this.getValFromArray(
            upNDownArgs.array,
            upNDownArgs.index + 1,
            "id"
          );
          key = this.findFirstColEditable(keys, index);
          if (val || val === "") this.changeData({ id, key }, null);
        }
        break;

      case 38: // up
        key = keys[index];
        val = this.getValFromArray(
          upNDownArgs.array,
          upNDownArgs.index - 1,
          keys[index]
        );
        id = this.getValFromArray(
          upNDownArgs.array,
          upNDownArgs.index - 1,
          "id"
        );
        if (val || val === "") this.changeData({ id, key }, null);
        break;

      case 40: // down
        key = keys[index];
        val = this.getValFromArray(
          upNDownArgs.array,
          upNDownArgs.index + 1,
          keys[index]
        );
        id = this.getValFromArray(
          upNDownArgs.array,
          upNDownArgs.index + 1,
          "id"
        );
        if (val || val === "") this.changeData({ id, key }, null);
        break;

      default:
        return; // exit this handler for other keys
    }
  }

  /**
   * Función que maneja el evento de flechas presionadas en el teclado
   */
  onKeyDown = (event, data, upNDownArgs) => {
    /**
     * valida si es un evento de tabulación o de flecha
     */
    if (event.which === 9 || (event.which >= 37 && event.which <= 40)) {
      /**
       * valida si está habilitado el movimiento del cursor dentro del input con las flechas
       */
      if (this.state.arrowInsideInputs) {

        if (event.which === 37) {// Left
          const position = event.target.selectionStart;
          if (position > 0) {
            /* console.log("no navega", { position }); */
          } else this.navigation(event, data, upNDownArgs);
        } else if (event.which === 39) {// Right
          const val = event.target.value;
          const position = event.target.selectionStart;
          if (position < val.length) {
            /* console.log("no navega", { position, len: val.length }); */
          } else this.navigation(event, data, upNDownArgs);
        } else this.navigation(event, data, upNDownArgs);
      } else { //solo navegación
        this.navigation(event, data, upNDownArgs);
      }
    }
  };

  /**
   * Habilita o deshabilita las flechas dentro de input
   */
  arrowsNavHandler = event => {
    this.setState({ arrowInsideInputs: !this.state.arrowInsideInputs });
  };

  /**
   * Agrega un nuevo elemento a los datos
   */
  addNewElement = () => {
    const data = this.getData();
    data.push(
      _([data[0]]).mapByProperty(
        this,
        (key, val, item) =>
          key === "id" ? _(data).maxInArrayObjectByKey("id") + 1 : ""
      )[0]
    );
    this.setData(data);
  };

  render() {
    let button = "";
    let newElmButton = "";
    if (this.state.data.length) {
      button = (
        <div className={classes.divFloated}>
          <button onClick={this.arrowsNavHandler}>
            {this.state.arrowInsideInputs ? "Habilitar " : "Deshabilitar "}
            navegación con flechas rápida
          </button>
        </div>
      );
      newElmButton = (
        <div className={[classes.flexCenter, classes.divSpacing].join(" ")}>
          <button onClick={this.addNewElement}>Nuevo</button>
        </div>
      );
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
        {newElmButton}
      </div>
    );
  }
}

export default TableContainer;
