const _customObj = obj => ({
  /**
   * Cambia la propiedad de un objeto por un nuevo valor
   * y retornar la referencia al mismo objeto
   * @param {} key (string | int) Nombre de la propiedad
   * @param {} val (object) Valor actual de la propiedad
   */
  setKey: (key, val) => {
    obj[key] = val;
    return obj;
  },
  /**
   * Edita las propiedades de un objeto
   * @param {Object} whoOwnArg Indica a quien pertenece la función (parámetro this)
   * @param {Function} fn Función que retorna el valor para una propiedad (key) de cada objeto en el array
   *  (key, val, {keyValProperties, indexProperty, iniObj}) => {}
   */
  edit: (whoOwnArg, fn) =>
    Object.entries(obj).reduce(
      // para cada par propiedad, valor (key, val) del objeto que se va a mapear
      (newObj, keyVal, indexProperty, couples) => {
        const [key, val] = keyVal;
        return _customObj(newObj).setKey(
          key,
          fn.call(whoOwnArg, key, val, { couples, indexProperty, obj })
        );
      },
      {}
    )
});

const _customArr = array => ({
  /**
   * función básica de mapeo.
   * Equivalente a array.map()
   */
  map: callback => {
    const arr = [];

    array.forEach(element => {
      arr.push(callback(element));
    });

    return arr;
  },
  /**
   * Agrega un elemento al array y retorna el array
   */
  push: element => {
    array.push(element);
    return array;
  },
  /**
   * Encuentra el mínimo valor de una propiedad (key dada) de un objeto en un array
   */
  minInArrayObjectByKey: key => Math.min(...array.map(elm => elm[key])),
  /**
   * Encuentra el máximo valor de una propiedad (key dada) de un objeto en un array
   */
  maxInArrayObjectByKey: key => Math.max(...array.map(elm => elm[key])),
  /**
   * Recorrer array de objetos y mapear un objeto completo en el array
   * @param {object} whoOwnArg Indica a quien pertenece la función (parámetro this)
   * @param {Function} fn Función que retorna el valor para una propiedad (key) de cada objeto en el array
   *  (key, val, {keyValProperties, indexInKeyValProperties, mappingItem, mappingItemIndex, initialArray}) => {}
   */
  mapReduce: (whoOwnArg, fn) =>
    array.reduce(
      (arr, item, index, arrEl) =>
        _customArr(arr).push(fn.call(whoOwnArg, item, index, arrEl)),
      []
    ),
  /**
   * Recorrer array de objetos y mapear cada propiedad
   * @param {object} whoOwnArg Indica a quien pertenece la función (parámetro this)
   * @param {Function} fn Función que retorna el valor para una propiedad (key) de cada objeto en el array
   *  (key, val, {keyValProperties, indexInKeyValProperties, mappingItem, mappingItemIndex, initialArray}) => {}
   */
  mapByProperty: (whoOwnArg, fn) =>
    array.reduce(
      // para cada item en el array
      (newArr, item, index, initialArray) =>
        // agrega un objeto mapeado al nuevo array que posteriormente se va a retornar
        _customArr(newArr).push(_customObj(item).edit(whoOwnArg, fn)),
      []
    )
});
export default _customArr;
