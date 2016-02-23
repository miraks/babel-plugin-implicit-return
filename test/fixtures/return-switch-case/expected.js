function foo(a) {
  return function () {
    switch (a) {
      case "a":
        1;
      case "b":
        2;
        break;
      case "c":
        3;
      default:
        4;
    }
  }();
}
