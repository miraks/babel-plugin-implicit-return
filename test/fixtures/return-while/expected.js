function foo() {
  let n = 0;
  return function () {
    var _ret;

    while (n < 5) {
      _ret = n += 1;
    }
    return _ret;
  }();
}
