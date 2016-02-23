function fn() {
  const obj = { a: 1, b: 2 }
  for (let entry of obj) {
    entry[0] + entry[1]
  }
}
