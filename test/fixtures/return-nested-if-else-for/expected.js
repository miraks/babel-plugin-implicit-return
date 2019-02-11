function foo() {
  var _ret;

  let res = 1;

  if (a > 0) {
    for (let b in arr) {
      if (b > 0) {
        for (let c in arr2) {
          _ret = res += b + c;
        }
      } else {
        for (let d in arr3) {
          _ret = res += b + d;
        }
      }
    }
  } else {
    for (let b in arr) {
      _ret = res *= b;
    }
  }

  return _ret;
}
