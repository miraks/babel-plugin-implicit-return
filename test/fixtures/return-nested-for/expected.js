function fn() {
  var _ret;

  for (let n = 0; n < 5; n += 1) {
    for (let k = 0; k < n; k += 1) {
      _ret = n + k;
    }
  }

  return _ret;
}
