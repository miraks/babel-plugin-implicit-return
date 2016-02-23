function fn() {
  const arr = [1, 2, 3];
  return function () {
    var _ret;

    for (let n in arr) {
      _ret = n + 1;
    }
    return _ret;
  }();
}
