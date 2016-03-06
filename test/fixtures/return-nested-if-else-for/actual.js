function foo() {
  let res = 1

  if (a > 0) {
    for (let b in arr) {
      if (b > 0) {
        for (let c in arr2) {
          res += b + c
        }
      } else {
        for (let d in arr3) {
          res += b + d
        }
      }
    }
  } else {
    for (let b in arr) {
      res *= b
    }
  }
}
