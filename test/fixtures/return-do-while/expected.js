function fn() {
  let n = 0;
  return function () {
    var _ret;

    do {
      _ret = n += 1;
    } while (n < 5);
    return _ret;
  }();
}
