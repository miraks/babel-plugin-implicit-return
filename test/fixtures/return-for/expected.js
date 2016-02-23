function fn() {
  return function () {
    var _ret;

    for (let n = 0; n < 5; n += 1) {
      _ret = n - 1;
    }
    return _ret;
  }();
}
