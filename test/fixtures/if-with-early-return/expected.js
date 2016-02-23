function fn(a) {
  return function () {
    if (a >= 0) {
      if (a == 0) return 0;
      return 1;
    } else {
      return -1;
    }
  }();
}
