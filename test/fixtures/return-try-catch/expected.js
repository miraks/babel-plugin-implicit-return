function foo() {
  return function () {
    try {
      return 1;
    } catch (e) {
      2;
    }
  }();
}
