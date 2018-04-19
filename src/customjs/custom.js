const minInArrayByKey = (array, key) =>
  Math.min(...array.map(elm => elm[key]));

const maxInArrayByKey = (array, key) =>
  Math.max(...array.map(elm => elm[key]));

const arrayMap = (whoOwnArg, arrayToMap, fn) => {
  return arrayToMap.reduce((arrayToReturn, item, index, arrEl) => {
    arrayToReturn.push(fn.call(whoOwnArg, item, index, arrEl));
    return arrayToReturn;
  }, []);
};

/**
 * Aplanar array dada una propiedad
 * @param {object} whoOwnArg Indica a quien pertenece la función
 * @param {Array} arrayToMap Array de datos que se van a aplanar
 * @param {Function} fn Función que indica de que forma se van a aplanar (modificar)
 *  el valor en una key dada
 */
const arrayFlattenProp = (whoOwnArg, arrayToMap, fn) => {
  return arrayToMap.reduce((newArr, item, index, arrIni) => {
    newArr.push(Object.entries(item).reduce((newObj, pair, iPair, couples) => {
      const [key, val] = pair;
      const newVal = fn.call(whoOwnArg, key, val, {couples, iPair, item, index, arrIni});
      newObj[key] = newVal;
      return newObj;
    }, {}));
    return newArr;
  }, []);
};

export { minInArrayByKey, maxInArrayByKey, arrayMap, arrayFlattenProp };
