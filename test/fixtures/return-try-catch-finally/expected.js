function fn() {
  return function () {
    try {
      return 1;
    } catch (e) {
      2;
    } finally {
      return 3;
    }
  }();
}
