module.exports = {
  forEach(arr, fn) {
    for (const index in arr) {
      fn(arr[(index, index)]);
    }
  },

  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i]));
    }
    return result;
  }
};
