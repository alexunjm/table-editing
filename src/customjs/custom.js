const minInArrayByKey = (array, key) =>
  Math.min(...array.map(elm => elm[key]));

const maxInArrayByKey = (array, key) =>
  Math.max(...array.map(elm => elm[key]));

export {minInArrayByKey, maxInArrayByKey};