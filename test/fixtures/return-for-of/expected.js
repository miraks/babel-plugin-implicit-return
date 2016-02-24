function fn() {
  var _ret;

  const obj = { a: 1, b: 2 };
  for (let entry of obj) {
    _ret = entry[0] + entry[1];
  }
  return _ret;
}
