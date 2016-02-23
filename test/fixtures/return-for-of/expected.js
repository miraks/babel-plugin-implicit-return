function fn() {
  const obj = { a: 1, b: 2 };
  return function () {
    var _ret;

    for (let entry of obj) {
      _ret = entry[0] + entry[1];
    }
    return _ret;
  }();
}
