function fn() {
  var _ret;

  const arr = [1, 2, 3];

  for (let n in arr) {
    _ret = n + 1;
  }

  return _ret;
}
